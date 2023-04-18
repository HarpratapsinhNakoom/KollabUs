const ACTIONS = require("../actions");

const registerRoomHandler = (io, socket, socketUserMapping) => {
  // if (!socket || !io || !socketUserMapping) return;
  const joinRoom = ({ roomId, user }) => {
    // console.log("join room");

    // map user with socketId.
    socketUserMapping[socket.id] = user;

    // get array instead of map of all currently present clients in room.
    const clients = Array.from(io.sockets.adapter.rooms.get(roomId) || []);

    // iterate over each clients in room.
    clients.forEach((clientId) => {
      // give new joiner to already joined clients.
      io.to(clientId).emit(ACTIONS.ADD_PEER, {
        peerId: socket.id,
        createOffer: false,
        user,
      });

      // give already joined clients to new joiner.
      socket.emit(ACTIONS.ADD_PEER, {
        peerId: clientId,
        createOffer: true,
        user: socketUserMapping[clientId],
      });
    });

    // Join the target room now.
    socket.join(roomId);
    // console.log(clients);
  };

  const handleRelayIce = ({ peerId, iceCandidate }) => {
    // console.log("relay ice");

    io.to(peerId).emit(ACTIONS.ICE_CANDIDATE, {
      peerId: socket.id,
      iceCandidate,
    });
  };

  const handleRelaySdp = ({ peerId, sessionDescription }) => {
    // console.log("join sdp");

    io.to(peerId).emit(ACTIONS.SESSION_DESCRIPTION, {
      peerId: socket.id,
      sessionDescription,
    });
  };

  const handleLeave = ({ roomId }) => {
    // console.log("leave room");

    // get all rooms
    const { rooms } = socket;

    // iterate all rooms
    Array.from(rooms).forEach((roomId) => {
      // all clients of
      const clients = Array.from(io.sockets.adapter.rooms.get(roomId) || []);

      clients.forEach((clientId) => {
        io.to(clientId).emit(ACTIONS.REMOVE_PEER, {
          peerId: socket.id,
          userId: socketUserMapping[socket.id]?.id,
        });

        socket.emit(ACTIONS.REMOVE_PEER, {
          peerId: clientId,
          userId: socketUserMapping[clientId]?.id,
        });
      });

      socket.leave(roomId);
    });

    delete socketUserMapping[socket.id];
  };

  const handleMute = ({ roomId, userId }) => {
    const clients = Array.from(io.sockets.adapter.rooms.get(roomId) || []);
    clients.forEach((clientId) => {
      io.to(clientId).emit(ACTIONS.MUTE, {
        peerId: socket.id,
        userId,
      });
    });
  };

  const handleUnMute = ({ roomId, userId }) => {
    const clients = Array.from(io.sockets.adapter.rooms.get(roomId) || []);
    clients.forEach((clientId) => {
      io.to(clientId).emit(ACTIONS.UNMUTE, {
        peerId: socket.id,
        userId,
      });
    });
  };

  const handleMuteInfo = ({ userId, roomId, isMute }) => {
    const clients = Array.from(io.sockets.adapter.rooms.get(roomId) || []);
    clients.forEach((clientId) => {
      if (clientId !== socket.id) {
        // console.log("mute info");
        io.to(clientId).emit(ACTIONS.MUTE_INFO, {
          userId,
          isMute,
        });
      }
    });
  };

  socket.on(ACTIONS.JOIN, joinRoom);
  socket.on(ACTIONS.RELAY_ICE, handleRelayIce);
  socket.on(ACTIONS.RELAY_SDP, handleRelaySdp);
  socket.on(ACTIONS.LEAVE, handleLeave);
  socket.on(ACTIONS.MUTE, handleMute);
  socket.on(ACTIONS.UNMUTE, handleUnMute);
  socket.on(ACTIONS.MUTE_INFO, handleMuteInfo);
  socket.on("disconnecting", handleLeave);
};

module.exports = registerRoomHandler;
