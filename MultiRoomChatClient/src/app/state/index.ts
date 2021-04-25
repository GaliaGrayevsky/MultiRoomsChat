import {
    ActionReducerMap,
    createFeatureSelector,
    createSelector
} from "@ngrx/store";
import * as fromUserSate from "./userState/userState.reducer";

export interface AppState {
    userState: fromUserSate.UserState | undefined;
}

export const reducers: ActionReducerMap<AppState> = {
    userState: fromUserSate.UserStateReducer
};

// -------------------------------------------------------------------
// AUTH SELECTORS
// -------------------------------------------------------------------
export const selectUserState = createFeatureSelector<fromUserSate.UserState>("userState");

export const rooms = createSelector(
    selectUserState,
    fromUserSate.getRooms
);

export const error = createSelector(
    selectUserState,
    fromUserSate.getError
);

export const getUserRooms = createSelector(
    selectUserState,
    fromUserSate.getUserRooms
);

export const getSelectedRoom = createSelector(
    selectUserState,
    fromUserSate.getSelected
);

export const getSelectedRoomIndex = createSelector(
    selectUserState,
    fromUserSate.getSelectedIndex
);

export const getSelectedRoomUsers = createSelector(
    selectUserState,
    fromUserSate.getSelectedRoomUsers
);

export const getSelectedRoomMessages = createSelector(
    selectUserState,
    fromUserSate.getSelectedRoomChat
);