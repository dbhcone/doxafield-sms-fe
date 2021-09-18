import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { StepperOrientation } from '@angular/material/stepper';
import { map } from 'rxjs/operators';
import { AdmissionsService } from 'src/app/services/admissions.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admissionform',
  templateUrl: './admissionform.component.html',
  styleUrls: ['./admissionform.component.scss'],
})
export class AdmissionformComponent implements OnInit {
  imageSrc: string | undefined;
  selectedFile: File | undefined;
  stepperOrientation: Observable<StepperOrientation>;
  personalDetailsFormGroup!: FormGroup;
  addressAndBackgroundFormGroup!: FormGroup;
  healthDetailsFormGroup!: FormGroup;
  schoolHistoryFormGroup!: FormGroup;

  constructor(
    private fb: FormBuilder,
    breakpointObserver: BreakpointObserver,
    private admService: AdmissionsService,
    public dialogRef: MatDialogRef<AdmissionformComponent>,
    @Inject(MAT_DIALOG_DATA) public data?: any
  ) {
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')));
    this.prepareForm(data);
  }

  prepareForm(data?: any) {
    this.personalDetailsFormGroup = this.fb.group({
      surname: [
        data?.personalDetails.surname || null,
        Validators.compose([Validators.required, Validators.minLength(3)]),
      ],
      firstName: [
        data?.personalDetails.firstName || null,
        Validators.compose([Validators.required, Validators.minLength(3)]),
      ],
      otherNames: [data?.personalDetails.otherNames || null],
      dob: [data?.personalDetails.dob || null],
      gender: [data?.personalDetails.gender || null, Validators.required],
    });
    this.addressAndBackgroundFormGroup = this.fb.group({
      tribe: [data?.addressAndBackground.tribe || null, Validators.required],
      religion: [data?.addressAndBackground.religion || null, Validators.required],
      address: [data?.addressAndBackground.address || null, Validators.required],
      hometown: [data?.addressAndBackground.hometown || null, Validators.required],
      nationality: [data?.addressAndBackground.nationality || null, Validators.required],
      ghPostCode: [data?.addressAndBackground.ghPostCode || null, Validators.required],
    });
    this.schoolHistoryFormGroup = this.fb.group({
      lastSchoolAttended: [data?.schoolHistory.lastSchoolAttended || null, Validators.required],
      location: [data?.schoolHistory.location || null, Validators.required],
      reasonForLeaving: [data?.schoolHistory.reasonForLeaving || null, Validators.required],
      yearOfLeaving: [data?.schoolHistory.yearOfLeaving || null, Validators.required],
    });
    this.healthDetailsFormGroup = this.fb.group({
      bloodGroup: [data?.healthDetails.bloodGroup || null],
      sickleCellStatus: [data?.healthDetails.sickleCellStatus || null],
      allergies: [data?.healthDetails.allergies || null],
      specialComments: [data?.healthDetails.specialComments || null],
    });
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

  onSubmit() {
    const personalDetails = this.personalDetailsFormGroup.value;
    const addressAndBackground = this.addressAndBackgroundFormGroup.value;
    const schoolHistory = this.schoolHistoryFormGroup.value;
    const healthDetails = this.healthDetailsFormGroup.value;

    const admData = {
      personalDetails,
      addressAndBackground,
      schoolHistory,
      healthDetails,
    };

    const obs = this.data
      ? this.admService.updateAdmission(this.data?._id, admData)
      : this.admService.addAdmission(admData);
    obs.subscribe(
      async (resp: any) => {
        console.log('admission', resp);
        Swal.fire({ text: resp.message, icon: 'success', timer: 5000 });
        this.dialogRef.close();
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
