const chatModel = require('../Models/chatModel');

//We will have API endpoints to create Chats, get user chats, and then finding certain chats

const createChat = async(req, res) => {
    const {firstId, secondId} = req.body;

    try{
        //try to find a chat that already exists with the first and second id if not create a new one
        const chat = await chatModel.findOne({
            members: {$all: [firstId, secondId]},
        });

        if(chat) return res.status(200).json(chat); //If one already exists no need to create a new just send the one that exists

        //If one does not exist, create a new model

        const newChat = new chatModel({
            members: [firstId, secondId]
        })

        //Send the new chat to the front end

        const response = await newChat.save(); //.save() is saving it to the database

        res.status(200).json(response);

    }catch(error){
        console.log(error)
        res.status(500).json(error)
    }
};

//get User chats
const findUserChats = async(req, res) => {
    const userId = req.params.userId   //extract user id to use in the url parameter

    try{
        const chats = await chatModel.find({
            members: {$in: [userId]}
        })

        res.status(200).json(chats);

    }catch (error){
    console.log(error)
    res.status(500).json(error)
}
};


const findChat= async(req, res) => {
    const {firstId, secondId} = req.params;   //extract first and second id to use in the url parameter

    try{
        const chat = await chatModel.findOne({
            members: {$all: [firstId, secondId]}
        });

        res.status(200).json(chat);

    }catch (error){
    console.log(error)
    res.status(500).json(error)
}
};

module.exports = {createChat, findUserChats, findChat};


