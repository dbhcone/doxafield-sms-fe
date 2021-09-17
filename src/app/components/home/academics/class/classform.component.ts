import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, AbstractControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AcademicsService } from 'src/app/services/academics.service';
import Swal from 'sweetalert2';
import { CalendarformComponent } from '../calendar/calendarform.component';

@Component({
  selector: 'app-classform',
  templateUrl: './classform.component.html',
  styleUrls: ['./classform.component.scss'],
})
export class ClassformComponent implements OnInit {
  classForm;
  HEADING = 'ADD A NEW CLASS';
  SAVE = 'SAVE';
  constructor(private fb: FormBuilder, private acadService: AcademicsService, public dialogRef: MatDialogRef<CalendarformComponent>,
    @Inject(MAT_DIALOG_DATA) public data?: any) {
    this.classForm = fb.group({
      fullName: [data?.fullName || null, Validators.compose([Validators.required])],
      shortName: [data?.shortName || null, Validators.compose([Validators.required])],
      description: [data?.description || null, Validators.compose([Validators.minLength(20)])],
      rank: [data?.rank || null, Validators.compose([Validators.min(0), Validators.max(100)])],
    });
    if (this.data) {
      this.HEADING = 'EDIT CLASS DETAILS';
      this.SAVE = 'SAVE CHANGES';
    }
  }

  ngOnInit(): void {}

  public get fullName(): AbstractControl | null {
    return this.classForm.get('fullName');
  }

  public get shortName(): AbstractControl | null {
    return this.classForm.get('shortName');
  }
  public get description(): AbstractControl | null {
    return this.classForm.get('description');
  }

  public get rank(): AbstractControl | null {
    return this.classForm.get('rank');
  }

  onSubmit() {
    const obs = this.data ? 
                this.acadService.updateClass(this.data?._id, this.classForm.value) : 
                this.acadService.addClass(this.classForm.value);
    obs.subscribe(
      async (resp: any) => {
        console.log('class', resp);
        Swal.fire({ text: resp.message, icon: 'success', timer: 5000 });
      },
      (err) => {
        Swal.fire({
          title: `${err.error.status} - ${err.error.code}`,
          text: `${err.error.message}`,
          icon: 'error'
        });
      }
    );
  }
}
