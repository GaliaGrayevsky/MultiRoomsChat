import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmojisComponent } from './emojis/emojis.component';
import { ChatRoomComponent } from './chat-room/chat-room.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { ErrorComponent } from './error/error.component';

import { PipesModule } from '../pipes/pipes.module';
import { FormsModule } from '@angular/forms';

const COMPONENTS = [
  EmojisComponent,
  ChatRoomComponent,
  NavBarComponent,
  ErrorComponent
]

const MODULES = [
  CommonModule,
  PipesModule,
  FormsModule
]

@NgModule({
  declarations: COMPONENTS,
  imports: MODULES,
  exports: COMPONENTS
})
export class LayoutModule { }
