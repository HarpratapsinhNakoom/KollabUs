import React from "react";
import styles from "./InputBox.module.css";

const InputBox = (props) => {
  return (
    <div className={styles.inputCover}>
      <img className={styles.inputImage} src="/images/audio2.png" alt="" />
      <input
        className={styles.input}
        style={{ width: props.fullwidth === "true" ? "100%" : "inherit" }}
        type="text"
        {...props}
      />
    </div>
  );
};

export default InputBox;
