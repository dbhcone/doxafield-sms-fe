import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { AdmissionsService } from 'src/app/services/admissions.service';
import Swal from 'sweetalert2';
import { AddAdmissionComponent } from './add-admission.component';

@Component({
  selector: 'app-admissions',
  templateUrl: './admissions.component.html',
  styleUrls: ['./admissions.component.scss']
})
export class AdmissionsComponent implements OnInit {

  displayedColumns: string[] = [
    'surname',
    'firstName',
    'otherNames',
    'gender',
    'dob',
    'edit',
    'delete',
];
// dataSource: MatTableDataSource<UserData>;
dataSource: MatTableDataSource<any>;
subscription?: Subscription;

@ViewChild(MatPaginator)
paginator!: MatPaginator;
@ViewChild(MatSort)
sort!: MatSort;

constructor(private dialog: MatDialog, private admService: AdmissionsService ) {
    this.dataSource = new MatTableDataSource();
    this.getAllAdmissions();
}

getAllAdmissions(): void {
    this.admService.fetchAllAdmissions().subscribe((res: any) => {
      console.log(res);

      const alldata = res.data;
      console.log('all data ', alldata);
    //   this.dataSource.data = res.data.personalDetails;
    this.setDataSource(alldata);
    });
  }

  setDataSource (alldata: []) {
    this.dataSource.data = alldata.map((dt: any) => {return dt.personalDetails})
  }

ngOnDestroy(): void {
    this.subscription?.unsubscribe();
}
ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
}

applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
    }
}

openAdmissionForm(data?: any): void {
    const dialogRef = this.dialog.open(AddAdmissionComponent, {
        disableClose: true,
        data,
        position: {top: "20px"}
    });
    this.subscription = dialogRef.afterClosed().subscribe((result) => {
        console.log('dialog closed', result);
        // this.fetchMembersList();
    });
}

deleteUserAccount(_id: string) {
  console.log('delete user with id', _id);
    // this.auth.deleteUser(_id).subscribe(
    //     async (resp: any) => {
    //         console.log('Delete', resp);
    //         Swal.fire({ text: resp.message, icon: 'success' }).then((result) => {
    //             this.fetchMembersList();
    //         });
    //     },
    //     (err) => {
    //         Swal.fire({
    //             title: `${err.error.status} - ${err.error.code}`,
    //             text: `${err.error.message}`,
    //         });
    //     },
    // );
}

triggerDeleteAccount(_id: string) {
    Swal.fire({
        title: 'Delete Account - Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
        if (result.isConfirmed) {
            // Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
            // this.deleteUserAccount(_id);
        } else {
            Swal.fire('Cancelled', 'Your data is safe :)', 'error');
        }
    });
}

  ngOnInit(): void {
  }

}
