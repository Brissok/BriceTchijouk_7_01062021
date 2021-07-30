import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { CurrentUser } from '../models/CurrentUser.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUserSubject: BehaviorSubject<CurrentUser>;
  public currentUser: Observable<CurrentUser>;
  private authToken: string;
  private userId: number;

  constructor(private http: HttpClient,
              private router: Router) {
                this.currentUserSubject = new BehaviorSubject<CurrentUser>(JSON.parse(localStorage.getItem('currentUser')));
                this.currentUser = this.currentUserSubject.asObservable();
              }

  public get currentUserValue(): CurrentUser {
      return this.currentUserSubject.value;
  }
  
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
    if (localStorage.getItem('currentUser') === null) {
      return this.authToken;
    } else {
      return JSON.parse(localStorage.getItem('currentUser')).token;
    }
      
  }

  getUserId() {
    if (localStorage.getItem('currentUser') === null) {
      return this.userId;
    } else {
      return JSON.parse(localStorage.getItem('currentUser')).userId;
    }
  }

  loginUser(email: string, password: string) {
    return new Promise<any>((resolve, reject) => {
      this.http.post<any>('http://localhost:3000/auth/login', {email: email, password: password}).subscribe(
        (res: {errorBrute: string, userId: number, token: string}) => {
          if(!res.errorBrute) {
            this.userId = res.userId;
            this.authToken = res.token;
            localStorage.setItem('currentUser', JSON.stringify(res));
            this.currentUserSubject.next(res);
            resolve(res);
          } else {
            this.currentUserSubject.next(null);
            resolve(res);
          }
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.authToken = null;
    this.userId = null;
    this.currentUserSubject.next(null);
    this.router.navigate(['login']);
  }

}

