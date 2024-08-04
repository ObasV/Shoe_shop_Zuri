const express = require('express');
const verifyJWT = require('../middlewares/verifyJWT');
const {httpRegisterUser, httpGetUsers} = require("../controllers/user_controller.js")
const userRouter = express.Router();

userRouter.post("/register", httpRegisterUser);
userRouter.get("/", verifyJWT, httpGetUsers);

module.exports = userRouter;
