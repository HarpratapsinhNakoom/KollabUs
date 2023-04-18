const documentService = require("../services/document-services");

const registerDocumentHandler = (io, socket) => {
  // if (!io || !socket) return;
  const loadDocument = async (fileId) => {
    socket.join(fileId);
    if (io.sockets.adapter.rooms.get(fileId).size === 1) {
      const data = await documentService.getDocument(fileId);
      io.to(socket.id).emit("load-document", data);
    } else {
      socket.broadcast.to(fileId).emit("get-document-state");
    }
  };
  const syncDocument = (fileId, content) => {
    socket.broadcast.to(fileId).emit("load-document", content);
  };
  const changeDocument = (fileId, delta) => {
    socket.broadcast.to(fileId).emit("put-text", delta);
  };
  const saveDocument = async (fileId, content) => {
    await documentService.setDocument(fileId, content);
  };
  const changeCursor = (fileId, delta) => {
    socket.broadcast.to(fileId).emit("put-cursor", delta);
  };

  socket.on("get-document", loadDocument);
  socket.on("set-document-state", syncDocument);
  socket.on("put-text", changeDocument);
  socket.on("save-document", saveDocument);
  socket.on("put-cursor", changeCursor);
};

module.exports = registerDocumentHandler;
