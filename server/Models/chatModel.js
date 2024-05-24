const mongoose = require('mongoose');
//Legit just a model to show how we want to store the info we recieve into the database
const chatSchema = new mongoose.Schema({
    members: Array,

},{
    timestamps: true,
});

const chatModel = mongoose.model("Chat", chatSchema);

module.exports = chatModel;