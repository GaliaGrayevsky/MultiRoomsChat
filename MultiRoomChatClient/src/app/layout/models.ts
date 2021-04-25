export interface Message {
    message: string;
    user: string;
    onLine: boolean
}

export interface UserRoom {
    room: string,
    users: string[],
    chat: Message[]
}

export interface RoomsSummary {
    roomName: string,
    count: number
}

export interface SendMessageTemplate {
    userName: string,
    roomName: string,
    message: string
}