import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { AcademicsService } from 'src/app/services/academics.service';
import Swal from 'sweetalert2';
import { SubjectformComponent } from '../subject/subjectform.component';

@Component({
  selector: 'academics-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.scss']
})
export class SubjectComponent implements OnInit {
  displayedColumns: string[] = [
    'fullName',
    'shortName',
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
    this.getAllSubjects();
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  openSubjectForm(data?: any) {
    const dialogRef = this.dialog.open(SubjectformComponent, {
      disableClose: true,
      data,
      width: '400px',
    });

    this.subscription = dialogRef.afterClosed().subscribe((result) => {
      this.getAllSubjects();
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getAllSubjects(): void {
    this.acadService.fetchAllSubjects().subscribe((res: any) => {
      console.log(res);

      this.dataSource.data = res.data;
    });
  }

    
triggerDeleteSubject(_id: string) {
  Swal.fire({
      title: 'Delete Subject - Are you sure?',
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
