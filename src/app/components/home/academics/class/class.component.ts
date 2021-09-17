import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { AcademicsService } from 'src/app/services/academics.service';
import Swal from 'sweetalert2';
import { ClassformComponent } from './classform.component';

@Component({
  selector: 'academics-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.scss'],
})
export class ClassComponent implements OnInit {
  displayedColumns: string[] = [
    'fullName',
    'shortName',
    'rank',
    'description',
    'edit',
    'delete',
  ];
  dataSource: MatTableDataSource<any>;
  subscription?: Subscription;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(private dialog: MatDialog, private acadService: AcademicsService) {
    this.dataSource = new MatTableDataSource();
    this.getAllClasses();
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  openClassForm(data?: any) {
    const dialogRef = this.dialog.open(ClassformComponent, {
      disableClose: true,
      data,
      width: '400px',
    });

    this.subscription = dialogRef.afterClosed().subscribe((result) => {
      this.getAllClasses();
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getAllClasses(): void {
    this.acadService.fetchAllClasses().subscribe((res: any) => {
      console.log(res);

      this.dataSource.data = res.data;
    });
  }

    
triggerDeleteClass(_id: string) {
  Swal.fire({
      title: 'Delete Class - Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
  }).then((result) => {
      if (result.isConfirmed) {
        // TODO: perform deletion here
      } else {
          Swal.fire('Cancelled', 'Your data is safe :)', 'error');
      }
  });
}

}
