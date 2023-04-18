const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");

// UNSUCCESSFUL TRY TO VALIDATE RECEIVED USING JOI
// const Joi = require("@hapi/joi");

// REGISTER PATH
router.post("/register", async (req, res) => {
  // HANDLE IF EMAIL ALREADY REGISTERED
  const emailExists = await User.findOne({
    email: req.body.email,
  });
  if (emailExists) {
    res.status(400).send("Email already exists");
    return;
  }

  // MAKE SALT TO ENCRYPT PASSWORD
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  // CREATE NEW USER
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword,
  });

  // TRY TO CREATE NEW USER IN DATABASE
  try {
    const savedUser = await User.create(user);
    res.status(201).send("User created");
  } catch (error) {
    res.status(500).send(error, "Internal server error");
  }
});

// LOGIN PATH
router.post("/login", async (req, res) => {
  const userExists = await User.findOne({
    email: req.body.email,
  });
  if (!userExists) {
    return res.status(400).send("Incorrect email-id");
  }

  const validPassword = await bcrypt.compare(
    req.body.password,
    userExists.password
  );
  if (!validPassword) {
    return res.status(400).send("Incorrect password");
  }

  try {
    const token = jwt.sign({ _id: userExists._id }, process.env.TOKEN_SECRET);
    res.header("auth-token", token).send(token);
  } catch (error) {
    res.status(500).send(error, "Internal server error");
  }
});

module.exports = router;
