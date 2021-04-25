import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SafeHtmlPipe } from './safe-html-pipe.pipe';



@NgModule({
  declarations: [SafeHtmlPipe],
  imports: [
    CommonModule
  ]
})
export class PipesModule { }
