import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-join-room',
  templateUrl: './join-room.component.html',
  styleUrls: ['./join-room.component.css']
})
export class JoinRoomComponent implements OnInit {
  rooms: string[] = ['sala 01', 'sala 02'];
  constructor() { }

  ngOnInit(): void {
  }

}
