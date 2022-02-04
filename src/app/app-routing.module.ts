import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { 
    path: 'login', 
    loadChildren: (() => import('./auth/auth.module').then(m => m.AuthModule)) 
  },
  { 
    path: 'user', 
    loadChildren: (() => import('./user/user.module').then(m => m.UserModule)) 
  },
  { 
    path: 'chat', 
    loadChildren: (() => import('./chat/chat.module').then(m => m.ChatModule)),
    canActivate: [AuthGuard] 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
