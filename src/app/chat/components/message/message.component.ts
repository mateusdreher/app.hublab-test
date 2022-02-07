import { Component, Input, OnInit } from '@angular/core';
import { MessageDto } from '../../dtos/message.dto';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  @Input() message: MessageDto;
  date_label = '';

  constructor() {    
  }

  ngOnInit(): void {
  }

  setDateLabel() {
    const diffDays = this.getDateDiff(new Date(), this.message.send_at);

    if (diffDays == 0) this.date_label = 'Hoje às '; 
    else if (diffDays == 1) this.date_label = 'Ontem às '; 
  }

  getDateDiff(date1: Date, date2: Date) {
    const msPeerDays = 1000 * 60 * 60 * 24;
    date2 = new Date(date2);

    const dateUTC1 = Date.UTC(date1.getFullYear(), date1.getMonth(), date1.getDate());
    const dateUTC2 = Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate());

    return Math.abs(Math.floor((dateUTC2 - dateUTC1) / msPeerDays));
  }
}
