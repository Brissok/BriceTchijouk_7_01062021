import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  errorMsg: string;

  constructor(private formBuilder: FormBuilder,
              private auth: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required]
    });
  }

  onLogin() {
    const email = this.loginForm.get('email').value;
    const password = this.loginForm.get('password').value;
    this.auth.loginUser(email, password).then(
      (res) => {
        console.log(res.errorBrute);
        if (res.errorBrute) {
          this.errorMsg = res.errorBrute;
        } else if (!res.errorBrute) {
          this.router.navigate(['/posts']);
        }
        
      }
    ).catch(
      (error) => {
        this.errorMsg = error.error.message;
        console.log(error);
      }
    );
  }

}
