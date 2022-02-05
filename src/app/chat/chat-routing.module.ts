import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatComponent } from './components/chat/chat.component';
import { JoinRoomComponent } from './components/join-room/join-room.component';

const routes: Routes = [
  { 
    path: '', 
    redirectTo: 'join',
    pathMatch: 'full'
  },
  { 
    path: 'room/:room', 
    redirectTo: 'join',
    pathMatch: 'full'
  },
  { 
    path: 'room/:room/:verify', 
    component: ChatComponent
  },
  { 
    path: 'join', 
    component: JoinRoomComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChatRoutingModule { }
