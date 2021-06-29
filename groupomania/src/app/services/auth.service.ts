import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAuth$ = new BehaviorSubject<boolean>(false);
  private authToken: string;
  private userId: string;

  constructor(private http: HttpClient,
              private router: Router) {}

<<<<<<< HEAD
  createUser(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.http.post('http://localhost:3000/api/auth/signup', {email: email, password: password}).subscribe(
        (response: { message: string }) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

=======
  
  createUser(firstName: string, lastName: string, fonction: string, email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.http.post<any>('http://localhost:3000/auth/signup', {
        firstName: firstName, lastName: lastName, fonction: fonction, email: email, password: password})
        .subscribe(
          (response: { message: string }) => {
            resolve(response);
          },
          (error) => {
            reject(error);
          }
        );
    });
  }
            
>>>>>>> master
  getToken() {
    return this.authToken;
  }

  getUserId() {
    return this.userId;
  }

<<<<<<< HEAD
  loginUser(email: string, password) {
    return new Promise((resolve, reject) => {
      this.http.post('http://localhost:3000/api/auth/login', {email: email, password: password}).subscribe(
=======
  loginUser(email: string, password: string) {
    return new Promise<void>((resolve, reject) => {
      this.http.post<any>('http://localhost:3000/auth/login', {email: email, password: password}).subscribe(
>>>>>>> master
        (response: {userId: string, token: string}) => {
          this.userId = response.userId;
          this.authToken = response.token;
          this.isAuth$.next(true);
          resolve();
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  logout() {
    this.authToken = null;
    this.userId = null;
    this.isAuth$.next(false);
    this.router.navigate(['login']);
  }

<<<<<<< HEAD
}
=======
}

>>>>>>> master
