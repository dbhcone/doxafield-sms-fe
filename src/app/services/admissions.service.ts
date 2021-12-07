import { Injectable } from '@angular/core';
import { Client } from '../utils/client';
import {Admissions} from '../api/endpoints';
@Injectable({
  providedIn: 'root'
})
export class AdmissionsService {

  constructor(private client: Client) { }

  addAdmission(admission: any) {
    const headers = {Authorization: `Bearer ${localStorage.getItem('token')}`};
    return this.client.POST(`${Admissions.addAdmission}`, admission, headers);
  }
  updateAdmission(id: string, admission: any) {
    const headers = {Authorization: `Bearer ${localStorage.getItem('token')}`};
    return this.client.PATCH(`${Admissions.updateAdmission}`, id, admission, headers);
  }
  fetchAllAdmissions() {
    return this.client.GET(`${Admissions.allAdmissions}`);
  }

}
