import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, ofType, Effect } from "@ngrx/effects";
import { Action, Store } from "@ngrx/store";
import { of, Observable } from "rxjs";
import { catchError, map, mergeMap, tap } from "rxjs/operators";
import { SocketIOService } from "../../services/socket-io.service";

import * as UserStateActions from "./userState.action";
import { UserStateActionTypes } from "./userState.action";
import { RoomsSummary } from '../../layout/models';

@Injectable()
export class UserStateEffect {

    
    @Effect({dispatch: false})
    joinToRoom$: Observable<Action> = 
        this.actions$.pipe(
            ofType<UserStateActions.JoinToRoom>(UserStateActionTypes.JoinToRoom),
            tap((action) =>{
                                debugger;
                                if (this.socketService.isConnected()){
                                    this.socketService.joinToRoom(action['payload']);
                                }
                            }
            )
        ); 

    @Effect()
    emitMessage$: Observable<Action> = 
        this.actions$.pipe(
            ofType<UserStateActions.EmitMessage>(UserStateActionTypes.EmitMessage),
            mergeMap((action) =>{
                                this.socketService.emitMessage(action['payload']);
                                return of(new UserStateActions.UpdateChat(action.payload));
                            }
            )
        ); 
    

    /**
     * Constructor
     */
    constructor(private actions$: Actions, private store$: Store<any>, private socketService: SocketIOService) {
    }
}
