<<<<<<< HEAD
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
=======
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { Observable, Observer } from "rxjs";
import { AuthService } from "./auth.service";
>>>>>>> master

@Injectable()
export class AuthGuard implements CanActivate {

<<<<<<< HEAD
  constructor(private auth: AuthService,
              private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> {
    return Observable.create(
      (observer) => {
        this.auth.isAuth$.subscribe(
          (auth) => {
            if (auth) {
              observer.next(true);
            } else {
              this.router.navigate(['/login']);
            }
          }
        );
      }
    );
  }
=======
    constructor(private auth: AuthService,
                private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

        return Observable.create(
          (observer: Observer<boolean>) => {
            this.auth.isAuth$.subscribe(
              (auth) => {
                if (auth) {
                  observer.next(true);
                } else {
                  this.router.navigate(['/login']);
                }
              }
            );
          }
        );
    }
>>>>>>> master
}