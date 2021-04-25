import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Message } from '../models';

const colors: string[] = [
  'red', 'blue', 'green'
]

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.scss']
})
export class ChatRoomComponent {

  @Input() users?: string[];
  @Input() userName: string;
  @Input() messages?: Message[];
  @Input() history?: boolean;


  emojiIcon: string = '&#128512;';
  show_emoji_list: boolean = false;
  messageText: string ="";

  is_disabled:boolean = true;

  @Output() sendMessage: EventEmitter<string> = new EventEmitter<string>();

  ngOnChanegs(){
    debugger;
  }

  constructor() { }

  addEmoji(emoji: string): void {    
    this.messageText = `${this.messageText}${emoji}`;
    this.is_disabled = false;
  }

  onInput() {
    if (this.messageText.length == 0){
      this.is_disabled = true;
    } else {
      this.is_disabled = false;
    }
    
  }
  send(){    
    this.sendMessage.emit(this.messageText);
    this.messageText = "";
  }
}
