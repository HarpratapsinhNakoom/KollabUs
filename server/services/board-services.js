const File = require("../models/Files");

class BoardService {
  async getBoard(id) {
    let f = await File.findOne({ fileId: id });
    if (!f) {
      f = await File.create({
        fileId: id,
        fileName: "",
        documentContent: "",
        boardContent: "",
      });
    }
    f.save();
    return f.boardContent;
  }
  async setBoard(id, content) {
    let f = await File.findOne({ fileId: id });
    if (!f) {
      f = await File.create({
        fileId: id,
        fileName: "",
        documentContent: "",
        boardContent: "",
      });
    }
    f.boardContent = content;
    f.save();
  }
}

module.exports = new BoardService();
