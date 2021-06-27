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

  
  createUser(firstName: string, lastName: string, fonction: string, email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.http.post('http://localhost:3000/auth/signup', {
        firstName: firstName, lastName: lastName, fonction: fonction, email: email, password: password})
        .subscribe(
          (response) => {
            resolve(response);
          },
          (error) => {
            reject(error);
          }
        );
    });
  }
            
  getToken() {
    return this.authToken;
  }

  getUserId() {
    return this.userId;
  }

  loginUser(email: string, password: string) {
    return new Promise<void>((resolve, reject) => {
      this.http.post('http://localhost:3000/auth/login', {email: email, password: password}).subscribe(
        (response) => {
          let result = Object.keys(response);
          this.userId = result[0];
          this.authToken = result[1];
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

}

