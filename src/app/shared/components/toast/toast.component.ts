import { Component, Input, OnInit } from '@angular/core';
import { ToastType } from '../../types/toast.type';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent implements OnInit {

  @Input() params: ToastType;

  constructor(
  ) {
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.params.show = false;
    }, 5000)
  }

  clickToast() {
    this.params.show = false;
  }

}
