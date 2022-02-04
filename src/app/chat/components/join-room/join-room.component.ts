import { Component, OnInit } from '@angular/core';
import { RoomDto } from '../../dtos/room.dto';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-join-room',
  templateUrl: './join-room.component.html',
  styleUrls: ['./join-room.component.css']
})
export class JoinRoomComponent implements OnInit {
  rooms: RoomDto[] = [];
  roomName: string = '';
  constructor(
    private chatService: ChatService
  ) { }

  ngOnInit(): void {
    this.getRooms();
  }

  getRooms() {
    this.chatService.getRooms().subscribe(
      (data) => {
        console.log(data);
        this.rooms = data;
      },
      (error) => {
        alert('Erro ao retornar as salas');
      }
    )
  }
  

  create() {
      if(!this.roomName.length) {
        alert('Nome da sala é obrigatório');
        return;
      }

      this.chatService.create(this.roomName).subscribe(
        (data) => {
          this.chatService.socketio(this.roomName);
        },
        (error) => {

        }
      )
  }
}
