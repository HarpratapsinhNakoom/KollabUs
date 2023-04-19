import React, { useState } from "react";
import styles from "./FileView.module.css";
import { useParams } from "react-router-dom";
import TextEditor from "../../components/TextEditor/TextEditor";
import Canvas from "../../components/Canvas/Canvas";

const steps = {
  1: TextEditor,
  2: Canvas,
};

const icon = {
  1: "board",
  2: "docs",
};

const Document = ({ user }) => {
  const { fileId } = useParams();
  const [item, setItem] = useState(1);
  const Component = steps[item];
  const Icon = icon[item];

  function handleToggle() {
    if (item === 1) setItem(2);
    else setItem(1);
  }

  return (
    <>
      <button className={styles.btn} onClick={handleToggle}>
        <img src={`\\images\\` + `${Icon}.png`} alt="" />
      </button>
      <Component
        fileId={fileId + `${item}`}
        width={1000}
        height={500}
        user={user}
      />
      {/* <Canvas fileId={fileId} width={1000} height={500} user={user} /> */}
    </>
  );
};

export default Document;
