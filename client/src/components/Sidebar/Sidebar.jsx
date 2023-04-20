import React, { useEffect, useState } from "react";
import styles from "./Sidebar.module.css";
import CreateVoiceModal from "../CreateVoiceModal/CreateVoiceModal";
import Channel from "../Channel/Channel";
import { useLocalContext } from "../../context/context";
import { doc, getDoc } from "firebase/firestore";
import { firebase_db } from "../../firebase";
import { useAuth } from "../../context/AuthContext";
const isCreator = true;

// const voiceChannels = [
//   { channelId: "123", channelName: "Proton" },
//   { channelId: "234", channelName: "Neutron" },
//   { channelId: "345", channelName: "Atom" },
//   { channelId: "456", channelName: "Electron" },
//   { channelId: "567", channelName: "Positron" },
//   { channelId: "678", channelName: "Nucleus" },
//   { channelId: "111", channelName: "Gravity" },
//   { channelId: "222", channelName: "Rotation" },
//   { channelId: "333", channelName: "Equilibrium" },
//   { channelId: "444", channelName: "Oscillate" },
//   { channelId: "555", channelName: "Magnetic" },
//   { channelId: "666", channelName: "Particles" },
// ];

const Sidebar = ({ user }) => {
  const {
    selectedSpace,
    currentVoiceChannels,
    setCurrentVoiceChannels,
    voiceChannelsCount,
  } = useLocalContext();
  const { currentUser } = useAuth();
  const [selectedChannel, setSelectedChannel] = useState(null);
  const [createModalOpen, setCreateModalOpen] = useState(false);

  useEffect(() => {
    async function getChannels() {
      try {
        const spaceRef = doc(firebase_db, "workspaces", selectedSpace.code);
        const spaceSnap = await getDoc(spaceRef);

        setCurrentVoiceChannels(spaceSnap.data().voiceChannels);
      } catch (err) {
        console.log(err);
      }
    }

    getChannels();
  }, [currentUser, voiceChannelsCount, selectedSpace]);

  function onClose() {
    setCreateModalOpen(false);
  }

  function openModal() {
    setCreateModalOpen(true);
  }

  function leaveCall() {
    setSelectedChannel(null);
  }

  function closeSidebar() {
    const element = document.getElementById("mySidebar");
    element.classList.add(styles.hideSidebar);
    const mask = document.getElementById("myMask");
    mask.classList.remove(styles.modalMask);
  }

  // useEffect(() => {
  //   return () => {
  //     console.log("unmounted");
  //   };
  // }, []);

  return (
    <div id="myMask">
      <div
        id="mySidebar"
        className={`${styles.sidebarWrapper} ${styles.hideSidebar}`}
      >
        {/* <div className={styles.textsWrapper}>
        <h2 className={styles.textsHeader}>TEXT CHANNELS</h2>
      </div> */}
        <div className={styles.sidebarHeaderWrapper}>
          <button onClick={closeSidebar} className={styles.closeButtonWrapper}>
            <img
              className={styles.closeButton}
              src="/images/right-arrow.png"
              alt=""
            />
          </button>
          <span className={styles.sidebarHeader}>{selectedSpace.name}</span>
        </div>
        <div className={styles.sidebarContentWrapper}>
          <div className={styles.voicesWrapper}>
            <h2 className={styles.voicesHeader}>
              <span>VOICE CHANNELS</span>
              {isCreator && (
                <button onClick={openModal} className={styles.plusButton}>
                  <img
                    className={styles.plusButtonImage}
                    src="/images/plus1.png"
                    alt=""
                  />
                </button>
              )}
            </h2>
            <div className={styles.allChannels}>
              {currentVoiceChannels.map((channel) => {
                return (
                  <div key={channel.channelId} className={styles.channelCover}>
                    <div className={styles.channelItem}>
                      <button
                        onClick={() => {
                          if (channel === selectedChannel) return;
                          setSelectedChannel(channel);
                        }}
                        className={styles.channelItemButton}
                      >
                        <img
                          className={styles.channelIcon}
                          src="/images/audio2.png"
                          alt=""
                        />
                        <span
                          className={`${
                            channel === selectedChannel ? styles.active : ""
                          }`}
                        >
                          {channel.channelName}
                        </span>
                      </button>
                    </div>
                    {channel === selectedChannel && (
                      <Channel user={user} channelId={channel.channelId} />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
          <div className={styles.voiceControlWrapper}>
            <div className={styles.profile}>
              <img
                className={styles.userImage}
                src={user.photoURL}
                alt="avatar"
              />
              <div className={styles.currentInfo}>
                <span className={styles.userName}>{user.displayName}</span>
                {selectedChannel && (
                  <span className={styles.channelName}>
                    {selectedChannel.channelName}
                  </span>
                )}
              </div>
            </div>
            {selectedChannel && (
              <button onClick={leaveCall} className={styles.leaveCall}>
                <img
                  className={styles.leaveCall}
                  src="/images/rejected1.png"
                  alt=""
                />
              </button>
            )}
          </div>
        </div>
      </div>
      {createModalOpen && <CreateVoiceModal onClose={onClose} />}
    </div>
  );
};

export default Sidebar;
