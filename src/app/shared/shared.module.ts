import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './components/button/button.component';
import { ToastComponent } from './components/toast/toast.component';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [
    ButtonComponent,
    ToastComponent
  ],
  imports: [
    CommonModule,
    NgbToastModule
  ],
  exports: [
    ButtonComponent,
    ToastComponent
  ]
})
export class SharedModule { }
