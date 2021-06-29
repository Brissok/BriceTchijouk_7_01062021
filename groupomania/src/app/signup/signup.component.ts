import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  errorMsg: string;

  constructor(private formBuilder: FormBuilder,
              private auth: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      fonction: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required]
    });
  }

  onSignup() {
    const firstName = this.signupForm.get('firstName').value;
    const lastName = this.signupForm.get('lastName').value;
    const fonction = this.signupForm.get('fonction').value;
    const email = this.signupForm.get('email').value;
    const password = this.signupForm.get('password').value;
    this.auth.createUser(firstName, lastName, fonction, email, password).then(
      (response) => {
        console.log(response);
        this.auth.loginUser(email, password).then(
          () => {
            this.router.navigate(['/posts']);
          }
        ).catch(
          (error) => {
            console.error(error);
            this.errorMsg = error.error.message;
          }
        );
      }
    ).catch((error) => {
        console.error(error);
        this.errorMsg = error.error.message;
    });
  }

}
