const express = require('express');
const {httpLogin} = require("../controllers/auth_controllers");
const authRouter = express.Router();

authRouter.post("/login", httpLogin);

module.exports = authRouter;