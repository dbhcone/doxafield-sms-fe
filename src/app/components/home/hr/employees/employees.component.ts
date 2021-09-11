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
  employeeForm: FormGroup;
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
    this.roles = [
      { id: '8930-r9eu9ieufe', name: 'Teacher' },
      { id: 'e8o9rue8ur9e', name: 'Accountant' },
      { id: 'iuer393ruyeruer', name: 'Driver' },
    ];

    this.employeeForm = this.fb.group({
      surname: ['', [Validators.required, Validators.minLength(3)]],
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      otherNames: ['', [Validators.minLength(3)]],
      gender: [
        '',
        [Validators.required, Validators.minLength(4), Validators.maxLength(6)],
      ],
      email: ['', [Validators.required, Validators.email]],
      mobileNumber: [
        '',
        [
          Validators.required,
          Validators.maxLength(10),
          Validators.minLength(10),
        ],
      ],
      ghPostAddress: ['', [Validators.pattern(/GH/), Validators.required]],
      role: ['', [Validators.required]],
      dob: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    console.log('Submitted form');
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onRoleChange(event: MatSelectChange) {
    console.log('fired', event.value);
  }
}
