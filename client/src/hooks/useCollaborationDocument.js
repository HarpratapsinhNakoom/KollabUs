import { useCallback, useEffect, useState, useRef } from "react";
import socketInit from "../Socket";
import Quill from "quill";
import "quill/dist/quill.snow.css";

function useCollaborationDocument({ styles, fileId, user }) {
  const [quill, setQuill] = useState(null);
  const socket = useRef(null);

  // Options to set toolbar.
  const TOOLBAR_OPTIONS = [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ font: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
    ["bold", "italic", "underline"],
    [{ color: [] }, { background: [] }],
    [{ script: "sub" }, { script: "super" }],
    [{ align: [] }],
    ["image", "blockquote", "code-block"],
    ["clean"],
  ];

  // Set up quill in HTML
  const wrapperRef = useCallback((wrapper) => {
    if (wrapper === null) return;
    wrapper.innerHTML = "";
    const editor = document.createElement("div");
    wrapper.append(editor);
    const q = new Quill(editor, {
      theme: "snow",
      modules: { toolbar: TOOLBAR_OPTIONS },
    });
    setQuill(q);
    q.disable();
  }, []);

  // useEffect combine
  useEffect(() => {
    if (!quill || !fileId) return;
    let interval; // for saving doc every 5 sec.

    // setup here.
    const initDocumentCollaboration = async () => {
      // initialize socket.
      socket.current = socketInit();

      // define listeners functions
      async function handleIncoming(delta) {
        // console.log("Handle Incoming");
        quill.updateContents(delta);
      }
      async function handleLocal(delta, oldDelta, source) {
        // console.log("Handle Local");
        if (source !== "user") return;
        // socket.current.emit("put-cursor", fileId, {
        //   user: user,
        //   position: quill.getSelection().index,
        // });
        socket.current.emit("put-text", fileId, delta);
      }
      async function loadDocument(content) {
        // console.log("Load Document");
        quill.setContents(content);
        quill.enable();
        const documentComponent = document.getElementById("documentComponent");
        documentComponent.classList.remove(styles.skeleton);
        interval = setInterval(() => {
          socket.current.emit("save-document", fileId, quill.getContents());
        }, 5000);
      }
      async function getDocumentState() {
        // console.log("Get Document State");
        socket.current.emit("set-document-state", fileId, quill.getContents());
      }

      // start listeners here.
      socket.current.emit("get-document", fileId);
      socket.current.once("load-document", loadDocument);
      socket.current.on("request-document", handleIncoming);
      socket.current.on("put-text", handleIncoming);
      socket.current.on("get-document-state", getDocumentState);
      quill.on("text-change", handleLocal);
    };

    // Initialize document collaboration.
    initDocumentCollaboration();

    return () => {
      // cleanup listeners here.
      socket.current.off("request-document");
      socket.current.off("put-text");
      socket.current.off("get-document-state");
      quill.off("text-change");
      clearInterval(interval);
      socket.current.disconnect();
      socket.current = null;
    };
  }, [quill, fileId]);

  return { wrapperRef };
}

export default useCollaborationDocument;
