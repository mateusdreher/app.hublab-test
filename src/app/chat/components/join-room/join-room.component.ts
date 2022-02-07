import { Component, OnInit } from '@angular/core';
import { ToastType } from 'src/app/shared/types/toast.type';
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
  selectedRoom:  string = '';
  toast: ToastType = {
    show: false,
    text: '',
    class: ''
  };
  
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
        this.toast.show = true;
        this.toast.text = 'Erro ao buscar salas';
      }
    )
  }
  
  joinRoom() {
    this.chatService.socketio(this.selectedRoom);
  }

  create() {
      if(!this.roomName.length) {
        this.toast.show = true;
        this.toast.text = 'O Nome da sala é obrigatório';
        return;
      }

      this.chatService.create(this.roomName).subscribe(
        (data) => {
          this.chatService.socketio(this.roomName);
        },
        (error) => {
          this.toast.show = true;
          this.toast.text = error.error || 'Error ao criar a sala';
        }
      )
  }
}
