import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent implements OnInit {

  @Input() text: string = '';
  @Input() backgroundColor: string = '#270080';
  @Input() contentColor: string = 'white';

  constructor() { }

  ngOnInit(): void {
  }

}
