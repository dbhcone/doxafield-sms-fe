import { Injectable } from '@angular/core';
import { Client } from '../utils/client';
import {Admissions} from '../api/endpoints';
@Injectable({
  providedIn: 'root'
})
export class AdmissionsService {

  constructor(private client: Client) { }

  addAdmission(admission: any) {
    return this.client.POST(`${Admissions.addAdmission}`, admission);
  }
  updateAdmission(id: string, admission: any) {
    return this.client.PATCH(`${Admissions.updateAdmission}`, id, admission);
  }
  fetchAllAdmissions() {
    return this.client.GET(`${Admissions.allAdmissions}`);
  }

}
