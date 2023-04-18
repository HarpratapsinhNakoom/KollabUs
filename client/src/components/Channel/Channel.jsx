import React, { useEffect, useState } from "react";
import useWebRTC from "../../hooks/useWebRtc";
import styles from "./Channel.module.css";

// const clients = [
//   {
//     id: 12,
//     name: "JNB",
//     avatar: "https://api.dicebear.com/6.x/initials/svg?seed=JB",
//     muted: false,
//   },
//   {
//     id: 23,
//     name: "NHB",
//     avatar: "https://api.dicebear.com/6.x/initials/svg?seed=NB",
//     muted: true,
//   },
//   {
//     id: 34,
//     name: "KNB",
//     avatar: "https://api.dicebear.com/6.x/initials/svg?seed=KB",
//     muted: false,
//   },
// ];

const Channel = ({ channelId: roomId, user }) => {
  const { clients, provideRef, handleMute } = useWebRTC(roomId, user);
  const [isMuted, setMuted] = useState(true);

  useEffect(() => {
    return () => {
      console.log("unmounted");
    };
  }, []);

  // keep watching for mute changes of current client.
  useEffect(() => {
    handleMute(isMuted, user.id);
  }, [isMuted]);

  // handle click on mute toggle by user.
  const handleMuteClick = (clientId) => {
    console.log("click");
    if (clientId !== user.id) {
      return;
    }
    setMuted((prev) => !prev);
  };

  return (
    <div className={styles.clientsList}>
      {clients.map((client) => {
        return (
          <div key={client.id} className={styles.clientBar}>
            <div className={styles.clientBarWrap}>
              <img
                className={styles.clientAvatar}
                src={client.avatar}
                alt="avatar"
              />
              <audio
                autoPlay
                ref={(instance) => {
                  provideRef(instance, client.id);
                }}
                className={styles.audioPlayer}
              />
              <span>{client.name}</span>
            </div>
            <button
              onClick={() => handleMuteClick(client.id)}
              className={styles.micBtn}
            >
              {client.muted ? (
                <img
                  className={styles.mic}
                  src="/images/mic-mute.png"
                  alt="mic"
                />
              ) : (
                <img className={styles.mic} src="/images/mic.png" alt="mic" />
              )}
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default Channel;
