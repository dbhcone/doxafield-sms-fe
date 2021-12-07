import { BreakpointObserver } from '@angular/cdk/layout';
import { StepperOrientation } from '@angular/cdk/stepper';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss'],
})
export class EmployeesComponent implements OnInit {
  submitting: boolean = false;
  personalDetailsFormGroup!: FormGroup;
  addressAndBackgroundFormGroup!: FormGroup;
  bankDetailsFormGroup!: FormGroup;
  roles: { id: string; name: string }[];

  stepperOrientation: Observable<StepperOrientation>;


  constructor(
    private breakpointObserver: BreakpointObserver,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EmployeesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')));
      this.prepareForm(data);
    this.roles = [
      { id: '8930-r9eu9ieufe', name: 'Teacher' },
      { id: 'e8o9rue8ur9e', name: 'Accountant' },
      { id: 'iuer393ruyeruer', name: 'Driver' },
    ];
  }

  prepareForm(data?: any) {
    this.personalDetailsFormGroup = this.fb.group({
      surname: [data?.personalDetails.surname || null, [Validators.required, Validators.minLength(3)]],
      firstName: [data?.personalDetails.firstName || null, [Validators.required, Validators.minLength(3)]],
      otherNames: [data?.personalDetails.otherNames || null, [Validators.minLength(3)]],
      gender: [
        data?.personalDetails.gender || null,
        [Validators.required, Validators.minLength(4), Validators.maxLength(6)],
      ],
      email: [data?.personalDetails.email || null, [Validators.required, Validators.email]],
      mobileNumber: [
        data?.personalDetails.mobileNumber || null,
        [
          Validators.required,
          Validators.maxLength(10),
          Validators.minLength(10),
        ],
      ],
      ghPostAddress: [data?.personalDetails.ghPostAddress || null, [Validators.pattern(/GH/), Validators.required]],
      role: [data?.personalDetails.role || null, [Validators.required]],
      dob: [data?.personalDetails.dob || null, [Validators.required]],
    });
    this.addressAndBackgroundFormGroup = this.fb.group({
      tribe: [data?.addressAndBackground.tribe || null, Validators.required],
      religion: [
        data?.addressAndBackground.religion || null,
        Validators.required,
      ],
      address: [
        data?.addressAndBackground.address || null,
        Validators.required,
      ],
      hometown: [
        data?.addressAndBackground.hometown || null,
        Validators.required,
      ],
      nationality: [
        data?.addressAndBackground.nationality || null,
        Validators.required,
      ],
      ghPostCode: [
        data?.addressAndBackground.ghPostCode || null,
        Validators.required,
      ],
    });
    this.bankDetailsFormGroup = this.fb.group({
      bankName: [null, [Validators.compose([Validators.required, Validators.minLength(3)])]],
      accountName: [null, [Validators.compose([Validators.required, Validators.minLength(5)])]],
      accountNumber: [null, [Validators.compose([Validators.required, Validators.minLength(5)])]],
      accountType: [null]
    })
  }

  ngOnInit(): void {}

  onSubmit() {
    console.log('Submitted form');
    if (!this.allFieldsValid()) return;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onRoleChange(event: MatSelectChange) {
    console.log('fired', event.value);
  }
  allFieldsValid() {
    return (
      this.personalDetailsFormGroup.valid &&
      this.addressAndBackgroundFormGroup.valid &&
      this.bankDetailsFormGroup.valid
    );
  }
}
