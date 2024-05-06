import {Injectable} from '@angular/core';
import {User} from "../models/User";

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor() { }

  public saveToken(token: string): void {
    if (typeof sessionStorage !== 'undefined') {
      window.sessionStorage.removeItem(TOKEN_KEY);
      window.sessionStorage.setItem(TOKEN_KEY, token);
    }
  }

  public getToken(): string | null {
    if (typeof sessionStorage !== 'undefined') {
      return sessionStorage.getItem(TOKEN_KEY);
    }
    return null;
  }

  public saveUser(user: User): void {
    if (typeof sessionStorage !== 'undefined') {
      window.sessionStorage.removeItem(USER_KEY);
      window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
    }
  }

  public getUser(): User | null {
    if (typeof sessionStorage !== 'undefined') {
      const userJson = sessionStorage.getItem(USER_KEY);
      if (userJson !== null) {
        return JSON.parse(userJson);
      }
    }
    return null;
  }

  public logOut(): void {
    if (typeof sessionStorage !== 'undefined') {
      window.sessionStorage.clear();
      window.location.reload();
    }
  }
}
