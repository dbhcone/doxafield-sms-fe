import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Auth } from '../api/endpoints';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  headers = {
    Accept: "application/json",
    "Content-Type": "application/json"
  };
  constructor(private http: HttpClient) { }

  authurl = `${environment.apibaseurl}/auth`
  adminLogin(data: any) {
    return this.http.post(this.authurl + Auth.adminLogin, data, {headers: this.headers});
  }

  staffLogin(data: any) {
    return this.http.post(this.authurl + Auth.staffLogin, data, {headers: this.headers});
  }

  studentLogin(data: any) {
    return this.http.post(this.authurl + Auth.studentLogin, data, {headers: this.headers});
  }

  createAdmin(data: any) {
    return this.http.post(this.authurl + Auth.createAdmin, data);
  }
}
