const { Server } = require("socket.io");

const io = new Server({ cors: "http://localhost:5173" }); //This would have to be changed if moved to productions

let onlineUsers = []

io.on("connection", (socket) => {
    console.log("new connection", socket.id);


    //listen to a custom connection

    socket.on("addNewUser", (userId) => {
        !onlineUsers.some((user => user.userId === userId)) && //some is an array function to search through a function to match to set arguments
        onlineUsers.push({ //If a user already exists then no need to add new user
            userId,
            socketId: socket.id
        });
        console.log("onlineUsers", onlineUsers);

        io.emit("getOnlineUsers", onlineUsers);
    });

    //Add Message

    socket.on("sendMessage", (message) => {
        const user = onlineUsers.find(
            (user) => user.userId === message.recipientId
        );

        if(user){ //This is when we are sending a message to the user
            io.to(user.socketId).emit("getMessage", message);
            io.to(user.socketId).emit("getNotification", {
                senderId: message.senderId,
                isRead: false,
                date: new Date()
            });
        }
    });

    socket.on("disconnect", () => {
        onlineUsers = onlineUsers.filter(user => user.socketId !== socket.id);

        io.emit("getOnlineUsers", onlineUsers);
    })

});

io.listen(3000);