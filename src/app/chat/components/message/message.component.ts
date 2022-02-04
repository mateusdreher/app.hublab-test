import { Component, Input, OnInit } from '@angular/core';
import { MessageDto } from '../../dtos/message.dto';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  @Input() message: MessageDto = {
    name: '',
    message: '',
    send_at: new Date(),
    room: ''
  };
  date_label = '';

  constructor() {
    const diffTime = Math.abs(new Date().getTime() - this.message.send_at.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays == 0) this.date_label = 'Hoje às '; 
    if (diffDays == 1) this.date_label = 'Ontem às '; 
  }

  ngOnInit(): void {
  }
}
