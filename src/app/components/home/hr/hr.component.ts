import { Component, OnDestroy, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { EmployeesComponent } from './employees/employees.component';
@Component({
  selector: 'app-hr',
  templateUrl: './hr.component.html',
  styleUrls: ['./hr.component.scss']
})
export class HrComponent implements OnInit, OnDestroy {
  subscription: any;

  constructor( private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openEmployeeForm() {
  
      const dialogRef = this.dialog.open(EmployeesComponent, {
        width: '500px',
        // data: {name: this.name, animal: this.animal}
        disableClose: true
      });
  
      this.subscription = dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed', result);
      });
    
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
    console.log('Destroyed')
  }

}
