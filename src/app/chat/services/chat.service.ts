import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { RoomDto } from '../dtos/room.dto';
import { io, Socket } from 'socket.io-client';
import { MessageDto } from '../dtos/message.dto';
import { Router } from '@angular/router';
import { Md5 } from 'ts-md5';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private baseUrl = 'http://localhost:3000';
  private socket!: Socket;
  public receivedMessaveSubject: BehaviorSubject<MessageDto>;
  public previousMessagesSubject: BehaviorSubject<MessageDto[]>;
  public newUserSubject: BehaviorSubject<string>;
  public downUserSubject: BehaviorSubject<string>;
  private user: string = '';
  private room: string = '';

  constructor(
    private http: HttpClient,
    private router: Router
  ) { 
    this.receivedMessaveSubject = new BehaviorSubject<MessageDto>(
      {
        message: '',
        room: '',
        name: '',
        send_at: new Date()
      }
    );
    this.previousMessagesSubject = new BehaviorSubject<MessageDto[]>([]);
    this.newUserSubject = new BehaviorSubject<string>('');
    this.downUserSubject = new BehaviorSubject<string>('');
  }

  public get previousMessagessValue(): MessageDto[] {
    return this.previousMessagesSubject.value;
  }

  getRooms(): Observable<RoomDto[]> {
    let headers = new HttpHeaders;
    const token = JSON.parse(sessionStorage.getItem('hublab_session') as string).token;
    headers = headers.append('auth', token);
    return this.http.get<RoomDto[]>(`${this.baseUrl}/room/all`, {headers});
  }

  create(name: string): Observable<RoomDto> {
    let headers = new HttpHeaders;
    const token = JSON.parse(sessionStorage.getItem('hublab_session') as string).token;
    headers = headers.append('auth', token);
    return this.http.post<RoomDto>(`${this.baseUrl}/room`, {name}, {headers})
  }

  socketio(room: string) {
    this.user = JSON.parse(sessionStorage.getItem('hublab_session') as string).user;
    this.socket = io(this.baseUrl, {query: {room, name: this.user}});
    this.room = room;
    const hash = new Md5().appendStr(room).end().toString();

    // Menagens anteriores ao se conectar a uma sala
    this.socket.on('previousMessages', (messages) => {
      this.previousMessagesSubject.next(messages);
      localStorage.setItem('room_verify', hash)
      this.router.navigate([`/chat/room/${room}/${hash}`])
    });

    //Escuta toda nova mensagem
    this.socket.on('receivedMessage', (message)=> {
      this.receivedMessaveSubject.next(message);
    });

    //Escuta todo novo usuário conectado
    this.socket.on('newUser', (data) => {
      this.newUserSubject.next(data);
    });

    this.socket.on('disconnectedUser', (data) => {
      this.downUserSubject.next(data);
    })
  }

  sendMessage(message: string) {
    const dto: MessageDto = {
      name: this.user,
      message,
      send_at: new Date(),
      room: this.room
    }
    this.socket.emit('newMessage', dto);
    return dto;
  }
  
}
  