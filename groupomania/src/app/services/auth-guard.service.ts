import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { Observable, Observer } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private auth: AuthService,
                private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

        return Observable.create(
          (observer: Observer<boolean>) => {
            this.auth.currentUser.subscribe(
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
}