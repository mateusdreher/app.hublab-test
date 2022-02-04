import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthRequestDto } from '../dtos/auth-request.dto';
import { AuthResponseDto } from '../dtos/auth-response.dto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:3000';
  public currentUSerSessionSubject: BehaviorSubject<any>;

  constructor(private http: HttpClient) { 
    this.currentUSerSessionSubject = new BehaviorSubject<any>(
      {
        session: JSON.parse(sessionStorage.getItem('session_value') as string), 
        expired: false}
    );
  }

  public get currentUserSessionValue(): string {
    return this.currentUSerSessionSubject.value;
  }

  public setCurrentUserSessionValue(session: string, expired: boolean) {
    sessionStorage.setItem('session_value', session);
    this.currentUSerSessionSubject.next({session, expired});
  }
  

  auth(dto: AuthRequestDto):Observable<AuthResponseDto> {
    return this.http.post<AuthResponseDto>(`${this.baseUrl}/auth`, dto);
  }
  

}
