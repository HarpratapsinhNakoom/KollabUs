import React, { useEffect, useState } from "react";
import styles from "./CreateVoiceModal.module.css";
import InputBox from "../InputBox/InputBox";
// import TextInput from "../shared/TextInput/TextInput";
// import { createRoom as create } from "../../http";
// import { useHistory } from "react-router-dom";
const CreateVoiceModal = ({ onClose }) => {
  //   const history = useHistory();

  const [voiceName, setVoiceName] = useState("");

  async function createRoom() {
    // try {
    //   if (!topic) return;
    //   const { data } = await create({ topic, roomType });
    //   history.push(`/room/${data.id}`);
    // } catch (err) {
    //   console.log(err.message);
    // }
    console.log(voiceName);
  }

  // useEffect(() => {
  //   const handleClickOutsideBox = (event) => {
  //     console.log("user clicked: ", event.target);
  //     const box = document.getElementById("modal");
  //     if (!box.contains(event.target)) {
  //       box.style.display = "none";
  //     }
  //   };

  //   document.addEventListener("click", handleClickOutsideBox);

  //   return () => {
  //     document.removeEventListener("click", handleClickOutsideBox);
  //   };
  // }, []);

  return (
    <div className={styles.modalMask}>
      <div className={styles.modalBody}>
        <button onClick={onClose} className={styles.closeButton}>
          <img src="/images/close.png" alt="close" />
        </button>
        <div className={styles.modalHeader}>
          <p className={styles.heading}>CHANNEL NAME</p>
          <InputBox
            fullwidth="true"
            value={voiceName}
            onChange={(e) => setVoiceName(e.target.value)}
          />
        </div>
        <div className={styles.modalFooter}>
          <button onClick={createRoom} className={styles.footerButton}>
            {/* <img
              className={styles.footerImage}
              src="/images/celebration.png"
              alt="celebration"
            /> */}
            <span>Create Channel</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateVoiceModal;
