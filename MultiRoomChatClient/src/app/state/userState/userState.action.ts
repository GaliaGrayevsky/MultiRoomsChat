import { Action } from "@ngrx/store";
import { Message, RoomsSummary, UserRoom, SendMessageTemplate } from '../../layout/models';
/**
 *Defenition of all actions that may be preformed on the state
 */

export enum UserStateActionTypes {
    SetRooms = "[UserState] Set rooms data",
    SetError = "[UserState] Set raised error",
    JoinToRoom = "[UserState] Join to room",
    UpdateRoom = "[UserState] Update users in the room",
    SetSelected = "[UserState] Set selected room",
    UpdateChat = "[UserState] Update chat",
    EmitMessage = "[UserState] Emit message to other users"
}

export class SetRooms implements Action {
    readonly type = UserStateActionTypes.SetRooms;

    constructor(public payload: RoomsSummary[]) {
    }
}


export class JoinToRoom implements Action {
    readonly type = UserStateActionTypes.JoinToRoom;

    constructor(public payload: string[]) {
    }
}

export class UpdateRoom implements Action {
    readonly type = UserStateActionTypes.UpdateRoom;

    constructor(public payload: UserRoom) {
    }
}

export class SetSelected implements Action {
    readonly type = UserStateActionTypes.SetSelected;

    constructor(public payload: string) {
    }
}

export class UpdateChat implements Action {
    readonly type = UserStateActionTypes.UpdateChat;

    constructor(public payload: SendMessageTemplate) {
    }
}

export class SetError implements Action {
    readonly type = UserStateActionTypes.SetError;

    constructor(public payload: string) {
    }
}

export class EmitMessage implements Action {
    readonly type = UserStateActionTypes.EmitMessage;

    constructor(public payload: SendMessageTemplate) {
    }
}

export type UserStateActions =
    | SetRooms
    | UpdateRoom
    | UpdateChat
    | SetError
    | JoinToRoom
    | SetSelected
    | EmitMessage
    ;
