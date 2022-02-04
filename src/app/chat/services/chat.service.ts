import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { RoomDto } from '../dtos/room.dto';
import { io, Socket } from 'socket.io-client';
import { MessageDto } from '../dtos/message.dto';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private baseUrl = 'http://localhost:3000/room';
  private socket!: Socket;
  public receivedMessaveSubject: BehaviorSubject<MessageDto>;
  private user: string = '';
  private room: string = '';

  constructor(
    private http: HttpClient
  ) { 
    this.receivedMessaveSubject = new BehaviorSubject<MessageDto>(
      {
        message: '',
        room: '',
        name: '',
        send_at: new Date()
      }
    );
  }

  getRooms(): Observable<RoomDto[]> {
    return this.http.get<RoomDto[]>(`${this.baseUrl}/all`);
  }

  create(name: string): Observable<RoomDto> {
    return this.http.post<RoomDto>(`${this.baseUrl}`, {name})
  }

  socketio(room: string) {
    this.user = JSON.parse(sessionStorage.getItem('user') as string).user;
    this.socket = io(this.baseUrl, {query: {room, name: this.user}});
    this.room = room;

    this.socket.on('previousMessages', (messages) => {
      console.log(messages)
      for (const message of messages) {
          this.receivedMessaveSubject.next(message)
      }
    });
    this.socket.on('receivedMessage', (message)=> {
      this.receivedMessaveSubject.next(message);
    });
  }

  sendMessage(message: string) {
    const dto: MessageDto = {
      name: this.user,
      message,
      send_at: new Date(),
      room: this.room
    }
    this.socket.emit('newMessage', dto);
  }
  
}
  