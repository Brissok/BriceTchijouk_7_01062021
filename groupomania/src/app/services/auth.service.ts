import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAuth$ = new BehaviorSubject<boolean>(JSON.parse(localStorage.getItem('isAuth')));
  private authToken: string;
  private userId: number;

  constructor(private http: HttpClient,
              private router: Router) {}

  
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
            
  getToken() {
    return this.authToken;
  }

  getUserId() {
    return this.userId;
  }

  loginUser(email: string, password: string) {
    return new Promise<void>((resolve, reject) => {
      this.http.post<any>('http://localhost:3000/auth/login', {email: email, password: password}).subscribe(
        (response: {userId: number, token: string}) => {
          this.userId = response.userId;
          this.authToken = response.token;
          localStorage.setItem('isAuth', "true");
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
    localStorage.removeItem('isAuth');
    this.authToken = null;
    this.userId = null;
    this.isAuth$.next(false);
    this.router.navigate(['login']);
  }

}

