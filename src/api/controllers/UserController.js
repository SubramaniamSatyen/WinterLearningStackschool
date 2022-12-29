const userModel = require("../models/User");
const bcrypt = require("bcrypt");

module.exports.createUser = async (req, res) => {
  const body = req.body;
  console.log(body)

  //If request body incorrect, send error
  if (!body.username || !body.password) {
    return res.status(400).send({ error: "Data not formatted properly" });
  }

  const existing = await userModel.findOne({ username: body.username });
  if (existing) {
    return res.status(401).send({ error: "Users already exists" }); 
  }
  // creating a new mongoose doc from user data
  const user = new userModel(body);

  // generate salt to hash password
  const salt = await bcrypt.genSalt(10);
  // now we set user password to hashed password
  user.password = await bcrypt.hash(user.password, salt);
  user.save().then((doc) => res.status(201).send(doc));
}

module.exports.login = async (req, res) => {
    const body = req.body;
    const user = await userModel.findOne({ username: body.username });
    if (user) {
      // check user password with hashed password stored in the database
      const validPassword = await bcrypt.compare(body.password, user.password);
      if (validPassword) {
        res.status(200).json({ message: "Valid password", id: user._id });
      } else {
        res.status(400).json({ error: "Invalid Password" });
      }
    } else {
      res.status(401).json({ error: "User does not exist" });
    }
}

module.exports.getName = async (req, res) => {
    const userID = req.body.user;
    const User = await userModel.findById(userID);
    res.json(User);
}