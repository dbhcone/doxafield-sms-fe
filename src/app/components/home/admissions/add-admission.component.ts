import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { StepperOrientation } from '@angular/material/stepper';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-add-admission',
  templateUrl: './add-admission.component.html',
  styleUrls: ['./add-admission.component.scss'],
})
export class AddAdmissionComponent implements OnInit {
  imageSrc: string | undefined;
  selectedFile: File | undefined;

  personalDetailsForm = this.fb.group({
    surname: [
      '',
      Validators.compose([Validators.required, Validators.minLength(3)]),
    ],
    firstName: [
      '',
      Validators.compose([Validators.required, Validators.minLength(3)]),
    ],
    otherNames: [null],
    dob: [null],
    gender: ['', Validators.required],
  });
  secondFormGroup = this.fb.group({
    secondCtrl: ['', Validators.required],
  });
  thirdFormGroup = this.fb.group({
    thirdCtrl: ['', Validators.required],
  });
  fourthFormGroup = this.fb.group({
    fourthCtrl: ['', Validators.required],
  });
  stepperOrientation: Observable<StepperOrientation>;

  constructor(private fb: FormBuilder, breakpointObserver: BreakpointObserver) {
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')));
  }

  ngOnInit(): void {}

  onFileSelected(event: any) {
    this.selectedFile = <File>event.target.files[0];
    this.previewImage();
    this.personalDetailsForm.patchValue({
      photo: this.selectedFile,
    });
    this.personalDetailsForm.get('photo')?.updateValueAndValidity();
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
}
