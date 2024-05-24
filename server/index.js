const express = require('express');
const cors = require('cors'); //Cors allows us to communicate with the frontend
const mongoose = require('mongoose');
const userRoute = require('./Routes/userRoute');
const chatRoute = require('./Routes/chatRoute');
const messageRoute = require('./Routes/messageRoute');

const app = express();
require("dotenv").config(); //Configuring our environment variable

//Middleware functions
app.use(express.json()); //This is a middleware function that will allow us to use JSON in this app
app.use(cors());
app.use("/api/users", userRoute);
app.use("/api/chats", chatRoute);
app.use("/api/messages", messageRoute);



//Routes: Create - Read - Update - Delete
app.get("/", (req, res) => {
    res.send("Welcome to our chat app APIs...");
})



const port = process.env.PORT || 5000;
const uri  = process.env.ATLAS_URI;


app.listen(port, (req, res) =>{
    console.log(`Server is running on port...: ${port}`);
});

mongoose.connect(uri, {
   // useNewUrlParser: true,
    //useUnifiedTopology: true
}).then(() => console.log("MongoDB connection established")).catch((error) => console.log("MongoDB connection failed: ", error.message));