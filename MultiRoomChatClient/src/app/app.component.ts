import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as UserActions from "./state/userState/userState.action";
import * as fromState from "./state";
import { Message, RoomsSummary, SendMessageTemplate } from './layout/models';
import { SocketIOService } from '../app/services/socket-io.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'multiRoomChatClient';
  test_emoji: string = "";

  open:boolean = false; // Open join menu
  createDisabled:boolean = true;

  roomName: string = "";
  userName: string = "";

  tabs: string[] = [];
  rooms: RoomsSummary[] = [];
  error: string;

  active_tab_users: string[] = [];
  active_tab_messages: Message[] = [];
  active_tab_index: number = 0;

  constructor(private store$: Store<any>, private socketService: SocketIOService){
  }

  ngOnInit(){
    /** Setting connection to the server and loading available rooms data */
    this.socketService.initConnection(this.store$);

    this.store$.pipe(select(fromState.rooms)).subscribe(
      (rooms: RoomsSummary[]) => {
          if (rooms) {
            this.rooms = rooms;
          }             
      }
    ); 

    this.store$.pipe(select(fromState.getUserRooms)).subscribe(
      (userRooms: string[]) => {
          if (userRooms) {
            console.log(userRooms);
            this.tabs = userRooms;
          }             
      }
    ); 

    this.store$.pipe(select(fromState.getSelectedRoomUsers)).subscribe(
      (data: string[]) => {
          if (data) {
            console.log(data);
            this.active_tab_users = data;
          }             
      }
    ); 

    this.store$.pipe(select(fromState.getSelectedRoomMessages)).subscribe(
      (data: Message[]) => {
          if (data) {
            console.log(data);
            this.active_tab_messages = data;
          }             
      }
    ); 

    this.store$.pipe(select(fromState.getSelectedRoomIndex)).subscribe(
      (data: number) => {
          if (data >= 0) {
            this.active_tab_index = data;
          }             
      }
    ); 

    this.store$.pipe(select(fromState.error)).subscribe(
      (error: string) => {
          if (error) {
            this.error = error;
          }             
      }
    ); 
  }

  joinRoom(roomName?: string){

    if (!this.userName) {
      this.store$.dispatch(new UserActions.SetError('Please, choose the Nick Name!'));
    } else {
      if (!roomName){
        if (!this.roomName) {
          this.store$.dispatch(new UserActions.SetError('Please, choose name for new room or select an existing one!'));
        } else {
          this.store$.dispatch(new UserActions.JoinToRoom([this.roomName, this.userName]));
        }        
      } else {
        this.store$.dispatch(new UserActions.JoinToRoom([roomName, this.userName]));
      }
    }
    
  }

  toogleOpen(){
    this.open = !this.open;
  }

  /** 
   * Set width to the room`s name div
  */
  setWidth(){
    return {
              width: 100/this.rooms.length + '%'
           }
  }

  /**
   * Enable create new room button if both fiels (userName and new roomName) are filed
   */
  setCreateDisabled() : void {
    (this.roomName.length > 0 && this.userName.length) ? this.createDisabled = false : this.createDisabled = true;
  }

  /**
   * Set selected tab and load appropriate data
   */
  setSelected(roomName: string){
    this.store$.dispatch(new UserActions.SetSelected(roomName));
  }

  /** Add the message to the current room chat and emit message to the socket */
  emitMessage($event: string) {
    this.store$.dispatch(new UserActions.EmitMessage({
                                                        userName: this.userName,
                                                        roomName: this.tabs[this.active_tab_index],
                                                        message: $event
                                                      }));
  }
}
