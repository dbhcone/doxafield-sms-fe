import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  schoolSettingsForm;
  constructor(private fb: FormBuilder) {
    this.schoolSettingsForm = fb.group({
      schoolName: [null, [Validators.compose([Validators.required, Validators.minLength(5)])]],
      motto: [null, [Validators.compose([Validators.required, Validators.minLength(5)])]],
      location: [null, [Validators.compose([Validators.required, Validators.minLength(5)])]],
      postalAddress: [null, [Validators.compose([Validators.required, Validators.minLength(5)])]],
      emailAddress: [null, [Validators.compose([Validators.required, Validators.email])]],
      contactNumber: [null, [Validators.compose([Validators.minLength(10), Validators.maxLength(13)])]]
    })
   }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log('Form is about to be submitted');
  }

  
  public get schoolName() : AbstractControl | null {
    return this.schoolSettingsForm.get('schoolName');
  }

  public get motto() : AbstractControl | null {
    return this.schoolSettingsForm.get('motto');
  }

  public get location() : AbstractControl | null {
    return this.schoolSettingsForm.get('location');
  }

  public get postalAddress() : AbstractControl | null {
    return this.schoolSettingsForm.get('postalAddress');
  }

  public get emailAddress() : AbstractControl | null {
    return this.schoolSettingsForm.get('emailAddress');
  }
  
  public get contactNumber() : AbstractControl | null {
    return this.schoolSettingsForm.get('contactNumber');
  }
}
