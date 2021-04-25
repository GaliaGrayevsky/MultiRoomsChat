import { Component, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-emojis',
  templateUrl: './emojis.component.html',
  styleUrls: ['./emojis.component.scss']
})
export class EmojisComponent {

  @Output() emoji: EventEmitter<any> = new EventEmitter<any>();

  emojiArr: string[] = [];

  constructor() { 

    // populate the emojji array with emogij decimal codes
    for (let i = 128512; i <= 128581; i++){
      this.emojiArr.push('\&#' + i + ';');
    }
  }

  emitEmoji(e: Event): void {
    debugger;
    this.emoji.emit(e.target['innerHTML']);
  }
}
