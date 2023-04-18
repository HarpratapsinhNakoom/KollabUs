const User = require("../../models/User");
const verify = require("./authVerify");

const router = require("express").Router();

// PATH WHICH IS ONLY ACCESSIBLE IF USER HAS VALID TOKEN
router.get("/allusers", verify, async (req, res) => {
  try {
    const results = await User.find().exec();
    res.send(results);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
