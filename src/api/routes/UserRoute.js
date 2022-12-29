const express = require("express");
const { login, createUser, getName} = require("../controllers/UserController");

//Initializing router and connecting database endpoints to database functions
const router = express.Router();

router.post("/create-user", createUser);

router.post("/login", login);

router.post("/get-name", getName)

module.exports = router;

