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
  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
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
    let { username, password, email, staffId } = this.loginForm.value;
    switch (this.type?.value) {
      case 'admin':
        this.adminLogin(username, password, email);
        break;
      case 'staff':
        this.staffLogin(username, password, staffId);
        break;
      default:
        this.studentLogin(username, password);
        break;
    }
  }

  adminLogin (username: string, password: string, email: string) {
    this.auth.adminLogin({ username, password, email }).subscribe(
      async (resp: any) => {
        if (!resp.error) {
          console.log(resp);
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
          titleText: err.error.message,
          icon: 'error',
        });
      }
    );
  }

  staffLogin (username: string, password: string, staffId: string) {
    this.auth.staffLogin({ username, password, staffId }).subscribe(
      async (resp: any) => {
        if (!resp.error) {
          console.log(resp);
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
          titleText: err.error.message,
          icon: 'error',
        });
      }
    );
  }

  studentLogin (username: string, password: string) {
    this.auth.studentLogin({ username, password }).subscribe(
      async (resp: any) => {
        if (!resp.error) {
          console.log(resp);
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
          titleText: err.error.message,
          icon: 'error',
        });
      }
    );
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
