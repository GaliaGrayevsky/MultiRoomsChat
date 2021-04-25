import { NgModule } from '@angular/core';
import { SocketIOService } from './socket-io.service';

const PROVIDERS = [
  SocketIOService
]

@NgModule({
  providers: PROVIDERS
})
export class ServicesModule { }
