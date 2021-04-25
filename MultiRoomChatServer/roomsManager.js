class RoomsManager {

    constructor() {
        this.rooms = [];
        this.me = this;
    }

    getRoomsList() {
        return this.rooms.map(e => {
                                        return { 
                                                 roomName: e.room, 
                                                 count: e.users.length
                                                }
                                    });
    }
    
    addNewRoom(roomName) {
        var room = this.rooms.find(e => e.room == roomName);
        if (!room){
            this.rooms.push(
                {
                    room: roomName,
                    users: []
                }
            );
            return { 
                        roomName: roomName, 
                        count: 0
                    }
        } else {
            console.log(`The room: ${roomName} already exists!`);
            return { 
                roomName: room.room, 
                count: room.users.length
               }
        }
    }

    addUserToRoom(userId, userName, roomName) {
        console.log('Adding to: ', userId, userName, roomName);

        // Check is there is another user with same userName
        let existingUser = false;
        this.rooms.forEach(room => {
            if (room.users.find( u => u.userName == userName && u.userId != userId)) {
                 existingUser = true;
            }
        });

        if (existingUser) {
            return `The chosen userName ${userName} is already taken by other user. Please, choose another!`;
        }

        //Check if the room with given name exsits, if not create a new one
        let room = this.rooms.find(e => e.room == roomName);

        if (!room) {
            this.me.addNewRoom(roomName);
            room = this.rooms.find(e => e.room == roomName);
        } 

        //Before adding the user to the room, check if it is already there
        let user = room.users.find( u => u.userName == userName);
        if (!user){
            room.users.push(
                { 
                    userName: userName,
                    userId: userId
                }
            );
        } else {
            return `UserName ${userName} is already joined this room`;
        }

        console.log('Adding to: ', userId, userName, roomName);
        return '';
    }

    getRoomUsers(roomName) {
        let room = this.rooms.find(e => e.room == roomName);
        
        return room ? room.users.map( u => u.userName) : null;
    }

    /**
     * Remove user from all the rooms he was in when users disconncts
     * @param {*} socketId - id of the disconnected socket
     * @returns all the rooms that socket left
     */
    removeUserFromRoom(socketId) {
        let users = [];

        for (let i = 0; i < this.rooms.length; i++){
            let indx = this.rooms[i].users.findIndex(u => u.userId == socketId);
            if (indx > 0){
                users.push({
                    userName: this.rooms[i].users[indx].userName,
                    roomName: this.rooms[i].room
                });
                this.rooms[i].users.splice(indx, 1);
            }
        }

        return users;
        
    }

    removeRoom(roomName) {
        //let this.rooms.find(e => e.room == roomName);
    }
}

const roomsManager = new RoomsManager();

module.exports = roomsManager;

