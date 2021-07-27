import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  constructor(private fb: FormBuilder) { 
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      type: ['', [Validators.required]]
    })
  }

  ngOnInit(): void {
  }

  get username () {
    return this.loginForm.get("username");
  }

  get password () {
    return this.loginForm.get("password");
  }

  get type () {
    return this.loginForm.get("type");
  }

  onSubmit() {
    console.log("submitting form with ", this.loginForm.value)
  }
}
