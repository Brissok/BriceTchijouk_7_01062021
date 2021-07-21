import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { CurrentUser } from './models/CurrentUser.model';
import { LinkService } from './services/link';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {

  currentUser: CurrentUser;

  constructor(private link: LinkService,
              private router: Router,
              private authService: AuthService
  ) {
    this.authService.currentUser.subscribe(x => this.currentUser = x);
  }

  logout() {
      this.authService.logout();
      this.router.navigate(['/login']);
  }

  ngOnInit() {

  }

}
