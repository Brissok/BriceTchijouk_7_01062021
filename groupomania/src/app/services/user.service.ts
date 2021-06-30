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

  getUserById(id: number) {
    return new Promise<any>((resolve, reject) => {
      this.http.get<any>('http://localhost:3000/auth/profil/' + id).subscribe(
        (response: User) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  modifyUser(id: number, user: User) {
    return new Promise<any>((resolve, reject) => {
        this.http.put<any>('http://localhost:3000/auth/profil/' + id, user).subscribe(
          (response: { message: string }) => {
            resolve(response);
          },
          (error) => {
            reject(error);
          }
        );
    });
  }

  deleteUser(id: number) {
    return new Promise<any>((resolve, reject) => {
      this.http.delete<any>('http://localhost:3000/auth/profil/' + id).subscribe(
        (response: { message: string }) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

}
