import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { StepperOrientation } from '@angular/material/stepper';
import { map } from 'rxjs/operators';
import { AdmissionsService } from 'src/app/services/admissions.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-admission',
  templateUrl: './add-admission.component.html',
  styleUrls: ['./add-admission.component.scss'],
})
export class AddAdmissionComponent implements OnInit {
  imageSrc: string | undefined;
  selectedFile: File | undefined;

  personalDetailsFormGroup = this.fb.group({
    surname: [
      null,
      Validators.compose([Validators.required, Validators.minLength(3)]),
    ],
    firstName: [
      null,
      Validators.compose([Validators.required, Validators.minLength(3)]),
    ],
    otherNames: [null],
    dob: [null],
    gender: [null, Validators.required],
  });
  addressAndBackgroundFormGroup = this.fb.group({
    tribe: [null, Validators.required],
    religion: [null, Validators.required],
    address: [null, Validators.required],
    hometown: [null, Validators.required],
    nationality: [null, Validators.required],
    ghPostCode: [null, Validators.required],
  });
  schoolHistoryFormGroup = this.fb.group({
    lastSchoolAttended: [null, Validators.required],
    location: [null, Validators.required],
    reasonForLeaving: [null, Validators.required],
    yearOfLeaving: [null, Validators.required],
  });
  healthDetailsFormGroup = this.fb.group({
    bloodGroup: [null],
    sickleCellStatus: [null],
    allergies: [null],
    specialComments: [null],
  });
  stepperOrientation: Observable<StepperOrientation>;

  constructor(private fb: FormBuilder, breakpointObserver: BreakpointObserver, private admService: AdmissionsService, public dialogRef: MatDialogRef<AddAdmissionComponent>,
    @Inject(MAT_DIALOG_DATA) public data?: any) {
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')));
  }

  ngOnInit(): void {}

  onFileSelected(event: any) {
    this.selectedFile = <File>event.target.files[0];
    this.previewImage();
    this.personalDetailsFormGroup.patchValue({
      photo: this.selectedFile,
    });
    this.personalDetailsFormGroup.get('photo')?.updateValueAndValidity();
  }
  /**
   * Preview the image selected to be uploaded
   */
  private previewImage() {
    const reader = new FileReader();
    if (this.selectedFile) {
      reader.readAsDataURL(this.selectedFile);
      reader.onload = () => {
        this.imageSrc = reader.result as string;
      };
    }
  }

  onSubmit () {
    const personalDetails = this.personalDetailsFormGroup.value;
    const addressAndBackground = this.addressAndBackgroundFormGroup.value;
    const schoolHistory = this.schoolHistoryFormGroup.value;
    const healthDetails = this.healthDetailsFormGroup.value;

    const admData = {personalDetails, addressAndBackground, schoolHistory, healthDetails};

    const obs = this.data ? 
                this.admService.updateAdmission(this.data?._id, admData) : 
                this.admService.addAdmission(admData);
    obs.subscribe(
      async (resp: any) => {
        console.log('admission', resp);
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
