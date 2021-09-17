import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, AbstractControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AcademicsService } from 'src/app/services/academics.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-calendarform',
  templateUrl: './calendarform.component.html',
  styleUrls: ['./calendarform.component.scss'],
})
export class CalendarformComponent implements OnInit {
  terms = [
    { name: 'One', value: '1' },
    { name: 'Two', value: '2' },
    { name: 'Three', value: '3' },
  ];
  years: any[] = [];
  calendarForm;
  HEADING = 'ADD A NEW CALENDAR';
  SAVE = 'SAVE';
  constructor(
    private fb: FormBuilder,
    private acadService: AcademicsService,
    public dialogRef: MatDialogRef<CalendarformComponent>,
    @Inject(MAT_DIALOG_DATA) public data?: any
  ) {
    this.generateYears();
    this.calendarForm = fb.group({
      year: [data?.year || null, Validators.compose([Validators.required])],
      term: [data?.term || null, Validators.compose([Validators.required])],
      commenceDate: [data?.commenceDate || null, Validators.compose([Validators.required])],
      endDate: [data?.endDate || null, Validators.compose([Validators.required])],
    });

    if (this.data) {
      this.HEADING = 'EDIT CALENDAR DETAILS';
      this.SAVE = 'SAVE CHANGES';
    }
  }

  ngOnInit(): void {}

  public get year(): AbstractControl | null {
    return this.calendarForm.get('year');
  }

  public get term(): AbstractControl | null {
    return this.calendarForm.get('term');
  }
  public get commenceDate(): AbstractControl | null {
    return this.calendarForm.get('commenceDate');
  }

  public get endDate(): AbstractControl | null {
    return this.calendarForm.get('endDate');
  }

  private generateYears() {
    const upperyearlimit = new Date().getUTCFullYear() + 1;
    const loweryearlimit = 2017;
    for (let index = loweryearlimit; index < upperyearlimit; index++) {
      const start = index;
      const end = start + 1;
      const val = `${start}/${end}`;
      const year = { name: val, value: val };
      this.years.push(year);
    }
    // this.years.sort((a, b) => b - a);
  }

  onSubmit() {
    const obs = this.data ? 
                this.acadService.updateCalendar(this.data?._id, this.calendarForm.value) : 
                this.acadService.addCalendar(this.calendarForm.value);
    obs.subscribe(
      async (resp: any) => {
        console.log('calendar', resp);
        Swal.fire({ text: resp.message, icon: 'success', timer: 5000 });
      },
      (err) => {
        Swal.fire({
          title: `${err.error.status} - ${err.error.code}`,
          text: `${err.error.message}`,
        });
      }
    );
  }
}
