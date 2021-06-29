import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from '../models/User.model';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {
  
  isAuth = false;

  user: User;
  userId: string;

  constructor(private userService: UserService,
              private route: ActivatedRoute,
              private auth: AuthService) {

  }

  ngOnInit() {
    this.userId = this.auth.getUserId();
    console.log(this.auth.getUserId());
    this.route.params.subscribe(
      (params) => {
        this.userService.getUserById(params.id).then(
          (response) => {
            console.log(response);

          }
        );
      }
    );
    this.userId = this.auth.getUserId();
  }

}
