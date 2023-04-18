// import Quill from "quill";
// import "quill/dist/quill.snow.css";
// import { useCallback, useEffect, useRef, useState } from "react";
import "./TextEditor.css";
// import socketInit from "../../Socket";
// import { TOOLBAR_OPTIONS } from "../../Utils/ToolbarOptions";
import styles from "./TextEditor.module.css";
import useCollaborationDocument from "../../hooks/useCollaborationDocument";

function TextEditor({ fileId, user }) {
  console.log({ texteditor: fileId });
  const { wrapperRef } = useCollaborationDocument({ styles, fileId, user });

  // Draw quill interface here.
  return (
    <div
      style={{ height: "100%" }}
      id="documentComponent"
      className={styles.skeleton}
    >
      <div className="container" ref={wrapperRef}></div>
    </div>
  );
}

export default TextEditor;
