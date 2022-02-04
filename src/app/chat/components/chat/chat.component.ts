import { Component, OnInit } from '@angular/core';
import { MessageDto } from '../../dtos/message.dto';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  users: string[] = ['Mateus Dreher', 'Cleiton'];
  messages: MessageDto[] = [
    {
      name: 'Mateus Dreher',
      message: 'Olá galerinha',
      send_at: new Date(),
      room: 'sala'
    },
    {
      name: 'Cleiton',
      message: 'Olá hahaah',
      send_at: new Date(),
      room: 'sala'
    }
  ]; 
  
  constructor() {}

  ngOnInit(): void {
  }
  

}
