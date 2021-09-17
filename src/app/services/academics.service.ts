import { Injectable } from '@angular/core';
import { Client } from '../utils/client';
import {Academics} from '../api/endpoints';
@Injectable({
  providedIn: 'root'
})
export class AcademicsService {

  constructor(private client: Client) { }

  addCalendar(calendar: any) {
    return this.client.POST(`${Academics.addCalendar}`, calendar);
  }
  updateCalendar(id: string, calendar: any) {
    return this.client.PATCH(`${Academics.updateCalendar}`, id, calendar);
  }
  fetchAllCalendars() {
    return this.client.GET(`${Academics.allCalendars}`);
  }

  // Class
  addClass(_class: any) {
    return this.client.POST(`${Academics.addClass}`, _class);
  }
  updateClass(id: string, _class: any) {
    return this.client.PATCH(`${Academics.updateClass}`, id, _class);
  }
  fetchAllClasses() {
    return this.client.GET(`${Academics.allClasses}`);
  }

  // Subject
  addSubject(subject: any) {
    return this.client.POST(`${Academics.addSubject}`, subject);
  }
  updateSubject(id: string, subject: any) {
    return this.client.PATCH(`${Academics.updateSubject}`, id, subject);
  }
  fetchAllSubjects() {
    return this.client.GET(`${Academics.allSubjects}`);
  }
}
