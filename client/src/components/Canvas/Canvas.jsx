import React, { useEffect, useRef, useState } from "react";
import styles from "./Canvas.module.css";
import useCollaborationBoard from "../../hooks/useCollaborationBoard";
const colors = ["#00FF00", "#0000FF", "#000000", "#FF0000"];

const canvasStyle = {
  border: "1px solid black",
};

function Canvas({ fileId, width, height, user }) {
  console.log({ canvas: fileId });
  const { clearBoard, setColor, setCanvasRef } = useCollaborationBoard({
    fileId,
    styles,
  });

  return (
    <div
      // style={{ height: "100vh" }}
      id="boardComponent"
      className={`${styles.skeleton} ${styles.boardWrapper}`}
    >
      <div className={styles.drawArea}>
        <canvas
          className={styles.customCanvas}
          width={width}
          height={height}
          style={canvasStyle}
          ref={setCanvasRef}
        />
      </div>
      <div className={styles.colorBox}>
        {colors.map((c, i) => {
          return (
            <button
              className={styles.btn}
              key={i}
              style={{ background: c }}
              onClick={() => setColor(c)}
            ></button>
          );
        })}
        <button className={styles.deleteButton} onClick={clearBoard}>
          <img
            className={styles.deleteButtonImage}
            src="\images\delete.png"
            alt=""
          />
        </button>
      </div>
    </div>
  );
}

export default Canvas;
