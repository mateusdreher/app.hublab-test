import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthRequestDto } from '../dtos/auth-request.dto';
import { AuthResponseDto } from '../dtos/auth-response.dto';
import { HublabSessionDto } from '../dtos/hublab_session.dto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:3000';
  public currentUSerSessionSubject: BehaviorSubject<any>;

  constructor(private http: HttpClient) { 
    this.currentUSerSessionSubject = new BehaviorSubject<any>(
      {
        hublab_session: JSON.parse(sessionStorage.getItem('hublab_session') as string), 
        expired: false
      }
    );
  }

  public get currentUserSessionValue(): string {
    return this.currentUSerSessionSubject.value;
  }

  public setCurrentUserSessionValue(dto: HublabSessionDto) {
    sessionStorage.setItem('token', JSON.stringify(dto));
    this.currentUSerSessionSubject.next(dto);
  }
  

  auth(dto: AuthRequestDto):Observable<AuthResponseDto> {
    return this.http.post<AuthResponseDto>(`${this.baseUrl}/auth`, dto);
  }
  

}
