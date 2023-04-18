import { useEffect, useRef, useState } from "react";

export function useOnDraw(onDraw) {
  const canvasRef = useRef(null);
  const isDrawingRef = useRef(null);

  //   const [mouseMove, setMouseMove] = useState(second)
  const mouseMoveRef = useState();
  const mouseUpRef = useRef(null);
  const mouseDownRef = useRef(null);

  const prevPointRef = useRef(null);

  //   useEffect(() => {
  //     return () => {
  //       if (mouseMoveRef.current) {
  //         window.removeEventListener("mousemove", mouseMoveRef.current);
  //       }
  //         if (mouseUpRef.current) {
  //           window.removeEventListener("mouseup", mouseUpRef.current);
  //         }
  //     };
  //   }, []);

  function setCanvasRef(ref) {
    if (!ref) return;
    // if (ref.current)
    //   canvasRef.current.removeEventListener("mousedown", mouseDownRef.current);
    canvasRef.current = ref;
    initMouseMoveListener();
    initMouseDownListener();
    initMouseUpListener();
  }

  function initMouseMoveListener() {
    const mouseMoveListener = (evt) => {
      if (!isDrawingRef.current) return;
      const point = computePointInCanvas(evt.clientX, evt.clientY);
      const ctx = canvasRef.current.getContext("2d");
      if (onDraw) onDraw(ctx, point, prevPointRef.current);
      prevPointRef.current = point;
    };
    mouseMoveRef.current = mouseMoveListener;
    window.addEventListener("mousemove", mouseMoveListener);
    // window.addEventListener("touchmove", mouseMoveListener);
  }

  function initMouseDownListener() {
    if (!canvasRef.current) return;
    const listener = () => {
      isDrawingRef.current = true;
    };
    mouseDownRef.current = listener;
    canvasRef.current.addEventListener("mousedown", listener);
    // window.addEventListener("touchstart", listener);
  }

  function initMouseUpListener() {
    if (!canvasRef.current) return;
    const listener = () => {
      isDrawingRef.current = false;
      prevPointRef.current = null;
    };
    mouseUpRef.current = listener;
    window.addEventListener("mouseup", listener);
    // window.addEventListener("touchend", listener);
  }

  function computePointInCanvas(clientX, clientY) {
    if (!canvasRef.current) return;
    const boundingRect = canvasRef.current.getBoundingClientRect();
    return { x: clientX - boundingRect.left, y: clientY - boundingRect.top };
  }

  function eraseCanvas() {
    if (!canvasRef.current) return;
    console.log("clear");
    const ctx = canvasRef.current.getContext("2d");
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  }
  return [setCanvasRef, eraseCanvas, canvasRef];
}
