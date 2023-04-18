const File = require("../../models/Files");

async function setDocument(id, content) {
  let f = await File.findOne({ roomno: id });
  if (!f) {
    f = await File.create({
      roomno: id,
      name: "",
      textContent: "",
      canvasContent: "",
    });
  }
  console.log("set");
  f.textContent = await JSON.stringify(content);
  f.save();
  return;
}

async function setCanvas(id, content) {
  let f = await File.findOne({ roomno: id });
  if (!f) {
    f = await File.create({
      roomno: id,
      name: "",
      textContent: "",
      canvasContent: "",
    });
  }
  f.canvasContent = content;
  f.save();
  return;
  // return f.canvasContent;
}

module.exports = { setDocument, setCanvas };
