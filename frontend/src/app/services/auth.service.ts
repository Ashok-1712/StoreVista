import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authUrl = 'http://localhost:3000/users';

  constructor(private http : HttpClient) { }

  register(email : string , password : string ): Observable<any> {
   const newUser = {email : email , password : password};
    return this.http.post<any>(`${this.authUrl}/register`,newUser);
  }
  login(email : string , password : string): Observable<any>{
    return this.http.post<any>(`${this.authUrl}/login`,{email : email , password : password});
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.authUrl);
  }

  addUser(newUser : any[]): Observable<any[]> {
    return this.http.post<any[]>(`${this.authUrl}/register`, newUser);
  }

  deleteUser(userId: number): Observable<any> {
    return this.http.delete(`${this.authUrl}/${userId}`);
  }
}
