import { Component, OnInit } from '@angular/core';
import { MessageDto } from '../../dtos/message.dto';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  users: string[] = ['Mateus Dreher', 'Cleiton'];
  messageInput: string = '';
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
  
  constructor(
    private chatService: ChatService
  ) {}

  ngOnInit(): void {
    this.chatService.receivedMessaveSubject.subscribe(
      (event: MessageDto) => {
        this.messages.push(event);
      }
    );
  }

  sendNewMessage() {
    if(!this.messageInput.length) {
      return;
    }
    this.chatService.sendMessage(this.messageInput)
  }
  

}
