import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';
import { CurrentUser } from '../models/CurrentUser.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  isAuth: CurrentUser;
  authSubscription: Subscription;

  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.authSubscription = this.auth.currentUser.subscribe(
      (auth) => {
        this.isAuth = auth;
      }
    );
  }
  

  onLogout() {
    this.auth.logout();
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }

}
