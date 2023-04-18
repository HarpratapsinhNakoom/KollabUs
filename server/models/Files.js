const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
  fileId: {
    type: String,
    required: true,
  },
  fileName: {
    type: String,
  },
  documentContent: {
    type: String,
  },
  boardContent: {
    type: String,
  },
});

module.exports = mongoose.model("File", fileSchema, "files");
