const fs = require('fs');
const path = require('path');

//Setup express server and configure its params
const express = require('express');
const app = express();
const http = require('http').createServer(app);


const config = require('./config.json');
const PORT = config.port || 5000;

const util = require('./util');

//Define app routes
const router = express.Router();
app.use('', router);

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname,'./index.html'));
});


http.listen(PORT, () => {
    console.log(`----------------------------------------------------------------------`);
    console.log(`Running MultiRoomChat Server on: http://localhost:${config.port}`);
    console.log(`----------------------------------------------------------------------`);
    console.log("\n");
});

// Initializing chat hub
const socketio = require('socket.io');
const io = socketio(http);

const roomManager = require('./roomsManager');

/* router.get('/getOpenRooms', (req, res) => {
    util.createSuccessResponse(res, roomManager.getRoomsList());
}); */

io.on("connection", (socket) => {
    console.log("Received connection from new user...");

    // upon a connection from new user, send info about available rooms
    socket.emit("roomsSummary", roomManager.getRoomsList());

    socket.on('joinRoom', (userObject) => {

        const error = roomManager.addUserToRoom(socket.id, userObject.userName, userObject.room);
        if (error != '') {
            socket.emit("errorMessage", generateMessage("Admin", userObject.room, error));
        } else {
            socket.join(userObject.room, function(err) {
                socket.broadcast.to(userObject.room).emit("message", generateMessage("Admin from after join", userObject.room, `${userObject.userName} has joined!`))
                io.to(userObject.room).emit("roomData", {
                            room: userObject.room,
                            users: roomManager.getRoomUsers(userObject.room)
                        });
                
                io.emit("roomsSummary", roomManager.getRoomsList());
                socket.emit("joinMessage", generateMessage("Admin", userObject.room, `Welcome, you've joined to ${userObject.room}`));
            });            
        }
        
    });

    socket.on('message', (userObject) => {
        socket.broadcast.to(userObject.roomName).emit("message", userObject);
    });

    socket.on('disconnect', () => {
        let rooms = roomManager.removeUserFromRoom(socket.id);
        //io.emit("roomsSummary", roomManager.getRoomsList());


        for (let i = 0; i < rooms.length; i++){

            io.to(rooms[i].roomName).emit("roomData", {
                room: rooms[i].roomName,
                users: roomManager.getRoomUsers(rooms[i].roomName)
            });
            io.emit("roomsSummary", roomManager.getRoomsList());
            socket.broadcast.to(rooms[i].roomName).emit("message", generateMessage('Admin', rooms[i].roomName, `User ${rooms[i].userName} left the chat!`));
        }
    })
});

generateMessage = function (userName, room, message){
    console.log(userName, room, message);
    return {
                userName: userName,
                roomName: room,
                message: message
            }
}
