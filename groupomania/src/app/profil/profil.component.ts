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
  userId: number;
  errorMessage: string;

  constructor(private userService: UserService,
              private route: ActivatedRoute,
              private auth: AuthService,
              private router: Router) {

  }

  ngOnInit() {
    this.userId = this.auth.getUserId();
    this.userService.getUserById(this.userId).then(
      (user: User) => {
        this.user = user;
      }
    );
  }

  onModify() {
    this.router.navigate(['/modify-profil', this.user.id]);
  }

  onDelete() {
    this.userService.deleteUser(this.user.id).then(
      (response: { message: string }) => {
        console.log(response.message);
        this.auth.logout();
      }
    ).catch(
      (error) => {
        this.errorMessage = error.message;
        console.error(error);
      }
    );
  }

}
