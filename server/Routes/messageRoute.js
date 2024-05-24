const express = require("express");
const { createMessage, getMessages } = require("../Controllers/messageController");


const router = express.Router();

router.post("/", createMessage);
router.get("/:chatId", getMessages); //When using a get, we most likely will be using a parameter for it


module.exports = router;