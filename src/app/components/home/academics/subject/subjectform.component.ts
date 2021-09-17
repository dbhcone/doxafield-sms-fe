import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AcademicsService } from 'src/app/services/academics.service';
import Swal from 'sweetalert2';
import { CalendarformComponent } from '../calendar/calendarform.component';

@Component({
  selector: 'app-subjectform',
  templateUrl: './subjectform.component.html',
  styleUrls: ['./subjectform.component.scss']
})
export class SubjectformComponent implements OnInit {
  subjectForm;
  HEADING = 'ADD A NEW SUBJECT';
  SAVE = 'SAVE';
  constructor(private fb: FormBuilder, private acadService: AcademicsService, public dialogRef: MatDialogRef<CalendarformComponent>,
    @Inject(MAT_DIALOG_DATA) public data?: any) {
    this.subjectForm = fb.group({
      fullName: [data?.fullName || null, Validators.compose([Validators.required])],
      shortName: [data?.shortName || null, Validators.compose([Validators.required])],
      description: [data?.description || null, Validators.compose([Validators.minLength(20)])]
    });
    if (this.data) {
      this.HEADING = 'EDIT SUBJECT DETAILS';
      this.SAVE = 'SAVE CHANGES';
    }
  }

  ngOnInit(): void {}

  public get fullName(): AbstractControl | null {
    return this.subjectForm.get('fullName');
  }

  public get shortName(): AbstractControl | null {
    return this.subjectForm.get('shortName');
  }
  public get description(): AbstractControl | null {
    return this.subjectForm.get('description');
  }

  onSubmit() {
    const obs = this.data ? 
                this.acadService.updateSubject(this.data?._id, this.subjectForm.value) : 
                this.acadService.addSubject(this.subjectForm.value);
    obs.subscribe(
      async (resp: any) => {
        console.log('Subject', resp);
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