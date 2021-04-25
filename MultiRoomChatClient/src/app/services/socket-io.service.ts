import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Store } from '@ngrx/store';
import * as UserActions from "../state/userState/userState.action";
import * as fromState from "../state";

import { environment } from '../../environments/environment';
import * as io from 'socket.io-client';
import { RoomsSummary, UserRoom, SendMessageTemplate } from '../layout/models';

@Injectable({
  providedIn: 'root'
})
export class SocketIOService {

  socketio; socket;

  public static controller = {
    GET_OPEN_ROOMS: '/getOpenRooms'
  }

  store$: Store<any>;

  constructor(private http: HttpClient) { }

  getOpenRooms()/* : Observable<RoomsSummary[]> */ {
    
    /* return this.http.get<RoomsSummary[]>(environment.SOCKET_ENDPOINT + SocketIOService.controller.GET_OPEN_ROOMS).pipe(
        map((response: RoomsSummary[]) => {
            return response;
        }),
        catchError((fault: HttpErrorResponse) => {
            console.warn(`loginFault( ${fault.error.message} )`);
            return throwError(fault);
        })
    ); */
    this.socket.emit('roomsList');
  }

  /**
   * Initiate connection with server side (opens web socket (or long pool))
   * Defines all the socket event listeners
   * @param store injects store 
   */
  initConnection(store: Store<any>) {

      this.store$ = store;

      this.socketio = io(environment.SOCKET_ENDPOINT);
      this.socket = this.socketio.on('connect', function() {
        console.log('Connected to the server');     
        //this.socket.emit('roomsList');           
      });

      /** Messages from another users*/
      this.socketio.on('message', (message) => {
        this.store$.dispatch(new UserActions.UpdateChat(message));
      });

      /** List of users in the room, when joined to the new room or when any update was performed on the room */
      this.socketio.on('roomData', (data) => {
        console.log(data);
        this.store$.dispatch(new UserActions.UpdateRoom(data));
      });

      /** Summary of all the open rooms at the moment, available to join*/
      this.socketio.on('roomsSummary', (message) => {
        this.store$.dispatch(new UserActions.SetRooms(message));
      });

      /** Confirmation of join to the room, server admin sends message, upon which selected room state is updated */
      this.socketio.on('joinMessage', (data) => {
        console.log(data);
        this.store$.dispatch(new UserActions.UpdateChat(data));
        this.store$.dispatch(new UserActions.SetSelected(data.roomName));
      });

      /**
       * Any error that might happen on the server side, like the nick name is already exists
      */
      this.socketio.on('errorMessage', (message) => {
        debugger;
        this.store$.dispatch(new UserActions.SetError(message.message));
      });
      
      
  }

  isConnected(): boolean {
    return !!this.isConnected;
  }

  joinToRoom(roomData?: string[]) {

    if (roomData) {
      this.socket.emit("joinRoom", {
        room: roomData[0],
        userName: roomData[1]
      });
    }
  }

  /**
   * sends message to the server
   * @param m message data: userName, roomName, message text
   */
  emitMessage(m: SendMessageTemplate){
    this.socket.emit("message", m);
  }
}
