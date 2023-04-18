const File = require("../../models/Files");

async function getDocument(id) {
  let f = await File.findOne({ roomno: id });
  if (!f) {
    f = await File.create({
      roomno: id,
      name: "",
      textContent: "",
      canvasContent: "",
    });
  }
  if (!f.textContent) return "";
  const ret = await JSON.parse(f.textContent);
  return ret;
}

async function getCanvas(id) {
  let f = await File.findOne({ roomno: id });
  if (!f) {
    f = await File.create({
      roomno: id,
      name: "",
      textContent: "",
      canvasContent: "",
    });
  }
  return f.canvasContent;
}

module.exports = { getDocument, getCanvas };
