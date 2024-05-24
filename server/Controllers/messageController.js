const messageModel = require("../Models/messageModel");

/*Controllers

1. Creating the message*/

const createMessage = async(req, res) => {
    const { chatId, senderId, text} = req.body

    const message = new messageModel({
        chatId, senderId, text
    })

    try{
        const response = await message.save();

        res.status(200).json(response); // this is where it is sent back to client. On the client side is where we get access to do with the message
                                        //what we want
    }catch(error){
        console.log(error);
        res.status(500).json(error);
    }
}


//2. Getting the messages
    const getMessages = async (req, res) =>{
        const {chatId} = req.params;

        try{
            const messages = await messageModel.find({chatId}) // Find all the messages using a specific chat id

            res.status(200).json(messages);
        }catch(error){
            console.log(error);
            res.status(500).json(error);
        }
    };


module.exports = { createMessage, getMessages};