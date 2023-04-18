import { useCallback, useEffect, useRef } from "react";
import useStateWithCallback from "./useStateWithCallback";
import socketInit from "../Socket.js";
import { ACTIONS } from "../actions";
import freeice from "freeice";

function useWebRTC(roomId, user) {
  const [clients, setClients] = useStateWithCallback([]); // EXPORTS Clients (More Later)
  const audioElements = useRef({}); // HTML references to audio elements of all clients
  const connections = useRef({}); // {socketId: webRtcConnection}
  const localMediaStream = useRef(null); // current user media stream object
  const socket = useRef(null); // socket.io instance
  const clientsRef = useRef([]); // reference to change without changing state.

  // FUNCTION - HANDLE ADDING AND REMOVING CLIENTS WITH EXTRA POST CALLBACK.
  // add new client function which is custom made for getting a callback after execution.
  const addNewClient = useCallback(
    (newClient, cb) => {
      const lookingFor = clients.find((client) => client.id === newClient.id);
      if (lookingFor) return;
      setClients((existingClients) => [...existingClients, newClient], cb);
    },
    [clients, setClients]
  );

  // USE EFFECT - HANDLE_CLIENTS_REF_SYNCHRONIZATION
  // Synchronize the state and ref of client.
  useEffect(() => {
    clientsRef.current = clients;
  }, [clients]);

  // USE EFFECT - HANDLE ALL SOCKET, INITIALIZATION AND WEB_RTC.
  // Handle all room logic and web RTC logic for streaming voice.
  useEffect(() => {
    // Setup all handlers and initiate streams with all already present client.
    const initGroupVoice = async () => {
      // Initialize socket connection.
      socket.current = socketInit();

      // Start capturing current users media in localStream.
      await captureMedia();

      // Add myself to clients state and setup HTML with content of localMediaStream.
      addNewClient({ ...user, muted: true }, () => {
        const localElement = audioElements.current[user.id];
        if (!localElement) return;
        localElement.volume = 0;
        localElement.srcObject = localMediaStream.current;
      });

      // Add event listeners to current socket.
      socket.current.on(ACTIONS.MUTE_INFO, handleMuteInfo);
      socket.current.on(ACTIONS.ADD_PEER, handleNewPeer);
      socket.current.on(ACTIONS.REMOVE_PEER, handleRemovePeer);
      socket.current.on(ACTIONS.ICE_CANDIDATE, handleIceCandidate);
      socket.current.on(ACTIONS.SESSION_DESCRIPTION, setRemoteMedia);
      socket.current.on(ACTIONS.MUTE, handleMute);
      socket.current.on(ACTIONS.UNMUTE, handleUnmute);

      // Join the room when entered.
      socket.current.emit(ACTIONS.JOIN, { roomId, user });

      // Function
      async function captureMedia() {
        // Start capturing local audio stream.
        localMediaStream.current = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
      }

      // Function
      // Handle new client joining.
      async function handleNewPeer({ peerId, createOffer, user: remoteUser }) {
        // if already connected then give warning.
        if (peerId in connections.current) {
          return console.warn(
            `You are already connected with ${peerId} (${user.name})`
          );
        }

        // create webRtc connection object of with reference to new client.
        connections.current[peerId] = new RTCPeerConnection({
          iceServers: freeice(),
        });

        // add eventlistener for new ice candidates and send it to new joiner.
        connections.current[peerId].onicecandidate = (event) => {
          socket.current.emit(ACTIONS.RELAY_ICE, {
            peerId,
            iceCandidate: event.candidate,
          });
        };

        // handle ontrack data on this connection on new joiner and add it to audioElement of that new joiner.
        connections.current[peerId].ontrack = ({ streams: [remoteStream] }) => {
          addNewClient({ ...remoteUser, muted: true }, () => {
            // get current users mute info
            const currentUser = clientsRef.current.find(
              (client) => client.id === user.id
            );
            if (currentUser) {
              socket.current.emit(ACTIONS.MUTE_INFO, {
                userId: user.id,
                roomId,
                isMute: currentUser.muted,
              });
            }
            if (audioElements.current[remoteUser.id]) {
              audioElements.current[remoteUser.id].srcObject = remoteStream;
            } else {
              let settled = false;
              const interval = setInterval(() => {
                if (audioElements.current[remoteUser.id]) {
                  audioElements.current[remoteUser.id].srcObject = remoteStream;
                  settled = true;
                }

                if (settled) {
                  clearInterval(interval);
                }
              }, 300);
            }
          });
        };

        // add local track to the new joiner connections.
        localMediaStream.current.getTracks().forEach((track) => {
          connections.current[peerId].addTrack(track, localMediaStream.current);
        });

        // create offer.
        if (createOffer) {
          const offer = await connections.current[peerId].createOffer();
          // add offer to local description
          await connections.current[peerId].setLocalDescription(offer);

          // send offer to all another clients...
          socket.current.emit(ACTIONS.RELAY_SDP, {
            peerId,
            sessionDescription: offer,
          });
        }
      }

      // Setup all functions
      // Function
      // Set offer from previous user in new joiner.
      async function setRemoteMedia({
        peerId,
        sessionDescription: remoteSessionDescription,
      }) {
        connections.current[peerId].setRemoteDescription(
          new RTCSessionDescription(remoteSessionDescription)
        );

        // if sessionDescription is type of Offer then create an answer.
        if (remoteSessionDescription.type === "offer") {
          const connection = connections.current[peerId];
          const answer = await connection.createAnswer();

          connection.setLocalDescription(answer);

          socket.current.emit(ACTIONS.RELAY_SDP, {
            peerId,
            sessionDescription: answer,
          });
        }
      }

      // Handle Leave remove client.
      async function handleRemovePeer({ peerId, userId }) {
        if (connections.current[peerId]) {
          connections.current[peerId].close();
        }

        delete connections.current[peerId];
        delete audioElements.current[peerId];
        setClients((list) => list.filter((c) => c.id !== userId));
      }

      // Send ice to server for letting the new user connect.
      async function handleIceCandidate({ peerId, iceCandidate }) {
        if (iceCandidate) {
          connections.current[peerId].addIceCandidate(iceCandidate);
        }
      }

      // Function
      // Handle muting of any clients for UI and state change of clients using ref.
      async function handleSetMute(mute, userId) {
        const clientIdx = clientsRef.current
          .map((client) => client.id)
          .indexOf(userId);
        const allConnectedClients = JSON.parse(
          JSON.stringify(clientsRef.current)
        );
        if (clientIdx <= -1) return;
        allConnectedClients[clientIdx].muted = mute;
        setClients(allConnectedClients);
      }

      // Function
      // Handle mute change information of other client.
      async function handleMuteInfo({ userId, isMute }) {
        handleSetMute(isMute, userId);
      }

      // Function
      // Self explanatory
      async function handleMute({ peerId, userId }) {
        handleSetMute(true, userId);
      }

      // Function
      // Self explanatory
      async function handleUnmute({ peerId, userId }) {
        handleSetMute(false, userId);
      }
    };

    // Function to setup all required listeners and streamers using webRtc and Socket.
    initGroupVoice();

    // Cleanup function to disable streaming and remove all socket listeners.
    return () => {
      // Close each track/stream of current client.
      localMediaStream.current.getTracks().forEach((track) => track.stop());

      // Leave current client from room by emitting leave and close all incoming streams and cleaning it from UI also.
      socket.current.emit(ACTIONS.LEAVE, { roomId });
      for (let peerId in connections.current) {
        connections.current[peerId].close();
        delete connections.current[peerId];
        delete audioElements.current[peerId];
      }

      // OFF all the socket listeners.
      socket.current.off(ACTIONS.ADD_PEER);
      socket.current.off(ACTIONS.REMOVE_PEER);
      socket.current.off(ACTIONS.ICE_CANDIDATE);
      socket.current.off(ACTIONS.SESSION_DESCRIPTION);
      socket.current.off(ACTIONS.MUTE);
      socket.current.off(ACTIONS.UNMUTE);
    };
  }, []);

  // EXPORT FUNCTION - PROVIDE_REF
  // Setup HTML elements using the useRef hook in parent.
  const provideRef = (instance, userId) => {
    audioElements.current[userId] = instance;
  };

  // EXPORT FUNCTION - HANDLE_MUTE
  // set state of mute to isMute the new mute state of userId.
  // Many redundant checks of userId!==user.id.
  const handleMute = (isMute, userId) => {
    if (userId !== user.id) return;
    let settled = false;

    // Try to do operation every 0.2s (to handle the lags).
    let interval = setInterval(() => {
      if (localMediaStream.current) {
        // Main step to handle change in voice stream of current stream.
        localMediaStream.current.getTracks()[0].enabled = !isMute;

        // Send changes to all the users and also myself using socket (to handle change in UI).
        if (isMute) {
          socket.current.emit(ACTIONS.MUTE, {
            roomId,
            userId: user.id,
          });
        } else {
          socket.current.emit(ACTIONS.UNMUTE, {
            roomId,
            userId: user.id,
          });
        }

        settled = true;
      }

      // clear the timeout once the change is settled.
      if (settled) clearInterval(interval);
    }, 200);
  };

  return { clients, provideRef, handleMute };
}

export default useWebRTC;
