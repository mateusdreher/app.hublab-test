import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageDto } from '../../dtos/message.dto';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  users: string[] = [];
  messageInput: string = '';
  messages: MessageDto[] = []; 
  room: string = '';
  hash: string = '';

  constructor(
    private chatService: ChatService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.roomVerify();
    this.listenEventsFromService();
  }

  roomVerify() {
    this.route.params.subscribe(
      (params) => {
        this.room = params['room'];
        this.hash = params['verify']
      }
    );
    const verify = localStorage.getItem('room_verify');
    if(this.hash != verify) {
      this.router.navigate(['/chat']);
      return;
    }
    localStorage.removeItem('room_verify');
  }

  listenEventsFromService() {
    this.chatService.receivedMessaveSubject.subscribe(
      (event: MessageDto) => {
        this.messages.push(event);
        this.scrollChat();
      }
    );

    this.chatService.previousMessagesSubject.subscribe(
      (event: MessageDto[]) => {
        this.messages = event;
        this.scrollChat();
      }
    );

    this.chatService.loggedUsersSubject.subscribe(
      (event: string[]) => {
        for (const user of event) {
          this.addUserToList(user);
        }
      }
    );

    this.chatService.newUserSubject.subscribe(
      (event) => {
        this.addUserToList(event);
      }
    );

    this.chatService.downUserSubject.subscribe(
      (event) => {
        this.removeUserFromList(event)
      }
    );
  }

  addUserToList(user: string) {
    const alreadyUser = this.users.filter(i => i == user);
        
    if(!alreadyUser.length) {
      this.users.push(user);
    }
  }

  removeUserFromList(user: string) {
    this.users = this.users.filter(i => i != user);
  }

  sendNewMessage() {
    if(!this.messageInput.length) {
      return;
    }
    const messageObject =   this.chatService.sendMessage(this.messageInput)
    this.messages.push(messageObject);
    this.messageInput = '';
    this.scrollChat();
  }

  scrollChat() {
    setTimeout(() => {
      const div = document.getElementsByClassName('messages')[0] as HTMLElement;
      div.scrollTo(0, div.scrollHeight)
    }, 100); 
  }
  
  verifyKey(event: any) {
    const { keyCode } = event;

    if(keyCode === 13 ) {
      this.sendNewMessage();
    }
  }

  exitRoom() {
    window.location.reload();
  }
}
