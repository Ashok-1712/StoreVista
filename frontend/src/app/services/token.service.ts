import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private tokenKey = 'token';
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.isTokenPresent());
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor() { }

  setToken(token : string): void {
    localStorage.setItem(this.tokenKey,token);
    this.isAuthenticatedSubject.next(true);
  }

  isTokenPresent(): boolean {
    return !!this.getToken() && !this.isTokenExpired();
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  removeToken(): void {
    this.isAuthenticatedSubject.next(false);
    return localStorage.removeItem(this.tokenKey);
    
  }

  decodeToken() : any | null {
    const token = this.getToken();
    if(token){
      return jwtDecode(token);
    }
    return null;
  }

  getUserRole() : string | null {
    const decodedToken = this.decodeToken();
    return decodedToken ? decodedToken.role : null;
  }

  isTokenExpired(): boolean {
    const decodedToken: any = this.decodeToken();
    return decodedToken ? Date.now() >= decodedToken.exp * 1000 : true;
  }
}
