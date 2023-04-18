const boardService = require("../services/board-services");

const registerBoardHandler = (io, socket) => {
  // if (!io || !socket) return;
  const loadBoard = async (fileId) => {
    socket.join(fileId);
    if (io.sockets.adapter.rooms.get(fileId).size === 1) {
      const data = await boardService.getBoard(fileId);
      io.to(socket.id).emit("load-canvas", data);
    } else {
      socket.broadcast.to(fileId).emit("get-canvas-state");
    }
  };
  const syncBoard = (fileId, content) => {
    socket.broadcast.to(fileId).emit("load-canvas", content);
  };
  const changeBoard = (fileId, prevPoint, currPoint, color) => {
    socket.broadcast.to(fileId).emit("put-line", prevPoint, currPoint, color);
  };
  const clearBoard = (fileId) => {
    socket.broadcast.to(fileId).emit("clear-board");
  };
  const saveBoard = async (fileId, content) => {
    await boardService.setBoard(fileId, content);
  };

  socket.on("get-board", loadBoard);
  socket.on("set-canvas-state", syncBoard);
  socket.on("put-line", changeBoard);
  socket.on("clear-board", clearBoard);
  socket.on("save-board", saveBoard);
};

module.exports = registerBoardHandler;
