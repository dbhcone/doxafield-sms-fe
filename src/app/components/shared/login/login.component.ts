import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatRadioChange } from '@angular/material/radio';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      type: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {}

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }

  get type() {
    return this.loginForm.get('type');
  }

  get email() {
    return this.loginForm.get('email');
  }

  async onSubmit() {
    console.log('submitting form with ', this.loginForm.value);
    let { username, password, email } = this.loginForm.value;
    switch (this.type?.value) {
      case 'admin':
        this.auth.adminLogin({ username, password, email }).subscribe(
          async (resp: any) => {
            if (!resp.error) {
              console.log(resp)
              Swal.fire({
                title: 'Success',
                titleText: resp.message,
                icon: 'success',
              }).then((res) => {
this.router.navigate(['home']);
              });
            }
          },
          (err: HttpErrorResponse) => {
            Swal.fire({
              title: 'Login Error',
              titleText: err.error.error.message,
              icon: 'error',
            });
          }
        );
        break;
      case 'staff':
        this.auth.staffLogin(this.loginForm.value).subscribe((resp: any) => {
          console.log('kiki', resp);
        });
        break;
      default:
        this.auth.studentLogin(this.loginForm.value).subscribe((resp: any) => {
          console.log('kik', resp);
        });
        break;
    }
  }

  removeEmailElement() {
    this.email && this.loginForm.removeControl('email');
  }

  addEmailElement() {
    this.loginForm.addControl(
      'email',
      new FormControl('', [Validators.email, Validators.required])
    );
  }

  typeRadioChange(event: MatRadioChange) {
    switch (event.value) {
      case 'admin':
        this.addEmailElement();
        break;
      default:
        this.removeEmailElement();
        break;
    }
  }
}
