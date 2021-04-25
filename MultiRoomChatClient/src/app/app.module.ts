import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServicesModule } from './services/services.module';
import { LayoutModule } from './layout/layout.module';
import { PipesModule } from './pipes/pipes.module';
import { StateModule } from './state/state.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


const MODULES = [
  CommonModule,
  BrowserModule,
  AppRoutingModule,
  ServicesModule,
  LayoutModule,
  PipesModule,
  StateModule,
  FormsModule,
  HttpClientModule
]

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: MODULES,
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
