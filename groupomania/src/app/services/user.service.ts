import { Subject } from "rxjs/Subject";
import { User } from "../models/User.model";
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";

@Injectable()
export class UserService {

  userSubject = new Subject<User[]>();
  private users: User[] = [];
  
  constructor(private http: HttpClient) {}

  emitUsers() {
    this.userSubject.next(this.users.slice());
  }

  getUsers() {
    this.http.get<any[]>('http://localhost:3000/auth/profil').subscribe(
      (response) => {
        this.userSubject.next(response);
      },
      (error) => {
        this.userSubject.next([]);
        console.error(error);
      }
    );
  }

  getUserById(id: string) {
    return new Promise((resolve, reject) => {
      this.http.get<any>('http://localhost:3000/profil/' + id).subscribe(
        (response: User) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

}
