import { useEffect, useRef } from "react";
import { useOnDraw } from "./DrawHook";
import socketInit from "../Socket";

function useCollaborationBoard({ fileId, styles }) {
  const [setCanvasRef, eraseCanvas, canvasRef] = useOnDraw(onDraw);
  const color = useRef("#00FF00");
  const loading = useRef(true);
  const socket = useRef(null);

  function setColor(newColor) {
    color.current = newColor;
  }

  function drawLineStandalone(start, end, ctx, color, width) {
    start = start ?? end;
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.strokeStyle = color;
    ctx.moveTo(start.x, start.y);
    ctx.lineTo(end.x, end.y);
    ctx.stroke();

    ctx.fillStyle = color;
    ctx.arc(end.x, end.y, 2, 0, 2 * Math.PI);
    ctx.arc(start.x, start.y, 2, 0, 2 * Math.PI);
    ctx.fill();
  }

  // Function to draw in all connected peers.
  function onDraw(ctx, point, prevPoint) {
    if (loading.current) return;
    drawLineStandalone(prevPoint, point, ctx, color.current, 5);
    socket.current.emit("put-line", fileId, prevPoint, point, color.current);
  }

  // Function to clear board in all connected peers.
  function clearBoard() {
    socket.current.emit("clear-board", fileId);
    eraseCanvas();
  }

  // universal useEffect
  useEffect(() => {
    if (!fileId) return;
    let interval;
    const ctx = canvasRef.current.getContext("2d");

    const initBoardCollaboration = async () => {
      // initialize socket.
      socket.current = socketInit();
      console.log(socket.current);

      // define listeners functions
      async function handleIncoming(prev, curr, color) {
        if (!ctx) return;
        drawLineStandalone(prev, curr, ctx, color, 5);
      }
      async function getCanvasState() {
        if (!canvasRef.current) return;
        socket.current.emit(
          "set-canvas-state",
          fileId,
          canvasRef.current.toDataURL()
        );
      }
      async function loadCanvas(content) {
        const img = new Image();
        img.src = content;
        img.onload = () => {
          ctx?.drawImage(img, 0, 0);
        };

        loading.current = false;
        const boardComponent = document.getElementById("boardComponent");
        boardComponent.classList.remove(styles.skeleton);

        interval = setInterval(
          () =>
            socket.current.emit(
              "save-board",
              fileId,
              canvasRef.current.toDataURL()
            ),
          5000
        );
      }

      // start listeners here.
      socket.current.emit("get-canvas", fileId);
      socket.current.emit("get-board", fileId);
      socket.current.once("load-canvas", loadCanvas);
      socket.current.on("clear-board", eraseCanvas);
      socket.current.on("put-line", handleIncoming);
      socket.current.on("get-canvas-state", getCanvasState);
    };

    initBoardCollaboration();

    // cleanup listeners here.
    return () => {
      socket.current.off("clear-board");
      socket.current.off("put-line");
      socket.current.off("get-canvas-state");
      clearInterval(interval);
      socket.current.disconnect();
      socket.current = null;
    };
  }, [fileId]);

  return { clearBoard, setColor, setCanvasRef };
}

export default useCollaborationBoard;
