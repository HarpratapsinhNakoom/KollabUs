const router = require("express").Router();
const File = require("../../models/Files");

// CREATE PATH
router.get("/create", async (req, res) => {
  // HANDLE IF FILE ALREADY REGISTERED
  const fileExists = await File.findOne({
    id: req.body.id,
  });
  if (fileExists) {
    res.status(400).send("File already exists");
    return;
  }

  // CREATE NEW FILE
  const file = new File({
    id: req.body.id,
    name: req.body.name,
    textContent: "",
    canvasContent: "",
  });

  // TRY TO CREATE NEW USER IN DATABASE
  try {
    const savedFile = await File.create(file);
    res.status(201).send("File created");
  } catch (error) {
    res.status(500).send(error, "Internal server error");
  }
});

module.exports = router;
