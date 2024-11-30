import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  url = 'http://localhost:5282/api/Users';

  getUsers() {
    return this.http.get<User[]>(this.url);
  }

  createUser(User: any) {
    return this.http.post(this.url, User);
  }

  deleteUser(UserId: number) {
    return this.http.delete(this.url + '/' + UserId);
  }

  getUserById(UserId: number) {
    return this.http.get<User>(this.url + '/' + UserId);
  }

  updateUser(UserId: any, User: any) {
    return this.http.put(this.url + '/' + UserId, User);
  }
}
