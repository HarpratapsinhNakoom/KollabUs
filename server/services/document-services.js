const File = require("../models/Files");

class DocumentService {
  async getDocument(id) {
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
    if (f.documentContent === "") return "";
    return await JSON.parse(f.documentContent);
  }
  async setDocument(id, content) {
    let f = await File.findOne({ fileId: id });
    if (!f) {
      f = await File.create({
        fileId: id,
        fileName: "",
        documentContent: "",
        boardContent: "",
      });
    }
    f.documentContent = await JSON.stringify(content);
    f.save();
  }
}

module.exports = new DocumentService();
