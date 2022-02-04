import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserCreateDto } from '../dtos/user-create.dto';
import { UserResponseDto } from '../dtos/user-response.dto';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:3000';

  constructor(
    private http: HttpClient
  ) { }

  create(dto: UserCreateDto): Observable<UserResponseDto> {
    return this.http.post<UserResponseDto>(`${this.baseUrl}/user`, dto);
  }
}
