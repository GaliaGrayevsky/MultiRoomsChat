import { Message, UserRoom } from "src/app/layout/models";
import { UserStateActionTypes, UserStateActions } from "./userState.action";
import { RoomsSummary, SendMessageTemplate } from '../../layout/models';


export interface UserState {
    rooms: RoomsSummary[],
    userRooms: UserRoom[],
    selectedRoom: string;
    error: string | null;
}

export const initialState: UserState = {
    rooms: [],
    userRooms: [],
    selectedRoom: "",
    error: ""
};

function initUserState(state: UserState = initialState): UserState {
    return {
        ...state,
        error: ""
    };
}

function setRooms(state: UserState = initialState, data: RoomsSummary[]): UserState {
    return {
        ...state,
        rooms: data,
        error: ""
    };
    
}

function updateRoom(state: UserState = initialState, data: UserRoom): UserState {
    
    let userRooms: UserRoom[] = [];
    let roomExists: boolean = false; // if we will not find the room in the list, it means that it is not set yet, so we will set it

    if (data && data.room) {
        debugger;
        if (state.userRooms.length > 0) {
            for (let i = 0; i < state.userRooms.length; i++){ // clone the user Rooms array (for deep cloning)
                let tmp = {...state.userRooms[i]}; 
                if (tmp.room == data.room){ // find the room that is required to be updated 
        
                    tmp.users = data.users;
                    
                    roomExists = true;
                    
                }
                
                userRooms.push(tmp);        
            }
        }
        
    
        if (!roomExists ){
            let tmp: UserRoom = {
                room: data.room,
                users: data.users,
                chat: []
            }
            userRooms.push(tmp); 
        }
    } 

    return {
        ...state,
        userRooms: userRooms,
        error: ""
    };
}

function setError(state: UserState = initialState, data: string): UserState {
    return {
        ...state,
        error: data
    };
}

function updateChat(state: UserState = initialState, data: SendMessageTemplate): UserState {

    let tmpState = {
        ...state,
        error: ""
    };

    // Clone array and add new message
    let chat: Message[] = tmpState.userRooms.find(e => e.room == data.roomName).chat.slice();
    chat.push({
        message: data.message,
        user: data.userName,
        onLine: true
    });

    tmpState.userRooms.find(e => e.room == data.roomName).chat = chat;

    return tmpState;
}

function setSelected(state: UserState = initialState, data: string): UserState {
    return {
        ...state,
        selectedRoom: data,
        error: ""
    };
}


export function UserStateReducer(state: UserState = initialState, action: UserStateActions): UserState {
    switch (action.type) {

        case UserStateActionTypes.SetRooms:
            return setRooms(state, action.payload);
        
        case UserStateActionTypes.UpdateRoom:
            return updateRoom(state, action.payload);

        case UserStateActionTypes.SetError:
            return setError(state, action.payload);

        case UserStateActionTypes.SetSelected:
            return setSelected(state, action.payload);
        
        case UserStateActionTypes.UpdateChat:
            return updateChat(state, action.payload);

        default:
            return state;
    }
}

export const getRooms = (state: UserState) => state.rooms;
export const getError = (state: UserState) => state.error;
export const getUserRooms = (state: UserState) => state.userRooms.map(e => e.room);
export const getSelected = (state: UserState) => state.selectedRoom;
export const getSelectedIndex = (state: UserState) => {
    for(let i = 0; i < state.userRooms.length; i++) {
        if (state.userRooms[i].room == state.selectedRoom){
            return i;
        }
    }
    return -1;
};

export const getSelectedRoomUsers = (state: UserState) => {
    for(let i = 0; i < state.userRooms.length; i++) {
        if (state.userRooms[i].room == state.selectedRoom){
            return state.userRooms[i].users;
        }
    }
    return [];
};

export const getSelectedRoomChat = (state: UserState) => {
    for(let i = 0; i < state.userRooms.length; i++) {
        if (state.userRooms[i].room == state.selectedRoom){
            return state.userRooms[i].chat;
        }
    }
    return [];
};