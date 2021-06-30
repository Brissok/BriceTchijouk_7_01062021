import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../models/User.model';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-profil-form',
  templateUrl: './profil-form.component.html',
  styleUrls: ['./profil-form.component.scss']
})
export class ProfilFormComponent implements OnInit {

  profilForm: FormGroup;
  user: User;
  userId: number;
  errorMsg: string;

  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private userService: UserService,
              private auth: AuthService) { }

  ngOnInit(): void {
    this.userId = this.auth.getUserId();
    this.userService.getUserById(this.userId).then(
      (user: User) => {
        this.user = user;
        this.initModifyForm(user);
      }
    ).catch(
      (error) => {
        this.errorMsg = JSON.stringify(error);
      }
    );

  }

  initModifyForm(user: User) {
    this.profilForm = this.formBuilder.group({
      firstName: [this.user.firstName, Validators.required],
      lastName: [this.user.lastName, Validators.required],
      fonction: [this.user.fonction, Validators.required]
    });
  }

  onSubmit() {
    const newUser = new User();
    newUser.firstName = this.profilForm.get('firstName').value;
    newUser.lastName = this.profilForm.get('lastName').value;
    newUser.fonction = this.profilForm.get('fonction').value;
    newUser.id = this.auth.getUserId();

    this.userService.modifyUser(this.user.id, newUser).then(
      (response: { message: string }) => {
        console.log(response.message);
        this.router.navigate(['/profil']);
      }
    ).catch(
      (error) => {
        console.error(error);
        this.errorMsg = error.message;
      }
    );
  }

}
