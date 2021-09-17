import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/shared/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// Angular Material Modules Start
// Material Start
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { OverlayModule } from '@angular/cdk/overlay';
import { CdkTreeModule } from '@angular/cdk/tree';
import { PortalModule } from '@angular/cdk/portal';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTreeModule } from '@angular/material/tree';
import { MatBadgeModule } from '@angular/material/badge';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MainLayoutComponent } from './components/shared/main-layout/main-layout.component';
import { LayoutModule } from '@angular/cdk/layout';
import { HomeDashboardComponent } from './components/home/dashboard/home-dashboard.component';
import { HrComponent } from './components/home/hr/hr.component';
import { FinanceComponent } from './components/home/finance/finance.component';
import { AdminLayoutComponent } from './components/shared/admin-layout/admin-layout.component';
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard.component';
import { SettingsComponent } from './components/home/settings/settings.component';
import { AcademicsComponent } from './components/home/academics/academics.component';
import { EmployeesComponent } from './components/home/hr/employees/employees.component';
import { MatDialogModule } from '@angular/material/dialog';
import { PupilsComponent } from './components/home/pupils/pupils.component';
import { MatStepperModule } from '@angular/material/stepper';

import { StoreModule } from '@ngrx/store';
import { navReducer } from './store/reducers/nav.reducers';
import { AdmissionsComponent } from './components/home/admissions/admissions.component';
import { AddAdmissionComponent } from './components/home/admissions/add-admission.component';
import { MatTableExporterModule } from 'mat-table-exporter';
import { CommunicationsComponent } from './components/home/communications/communications.component';
import { UsersComponent } from './components/admin/users/users.component';
import { AssessmentComponent } from './components/home/assessment/assessment.component';
import { CalendarComponent } from './components/home/academics/calendar/calendar.component';
import { ClassComponent } from './components/home/academics/class/class.component';
import { SubjectComponent } from './components/home/academics/subject/subject.component';
import { CalendarformComponent } from './components/home/academics/calendar/calendarform.component';
import { ClassformComponent } from './components/home/academics/class/classform.component';
import { SubjectformComponent } from './components/home/academics/subject/subjectform.component';
// Material End
// Angular Material Modules End

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainLayoutComponent,
    HomeDashboardComponent,
    HrComponent,
    FinanceComponent,
    AdminLayoutComponent,
    AdminDashboardComponent,
    SettingsComponent,
    AcademicsComponent,
    EmployeesComponent,
    PupilsComponent,
    AdmissionsComponent,
    AddAdmissionComponent,
    CommunicationsComponent,
    UsersComponent,
    AssessmentComponent,
    CalendarComponent,
    ClassComponent,
    SubjectComponent,
    CalendarformComponent,
    ClassformComponent,
    SubjectformComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    MatTableExporterModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatStepperModule,
    // Angular Material Imports Start
    MatButtonModule,
    CdkTreeModule,
    MatAutocompleteModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDividerModule,
    MatExpansionModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatButtonToggleModule,
    MatTreeModule,
    OverlayModule,
    PortalModule,
    MatBadgeModule,
    MatGridListModule,
    MatRadioModule,
    MatDatepickerModule,
    MatTooltipModule,
    LayoutModule,
    MatDialogModule,
    MatNativeDateModule,
    // Angular Material Imports End
    StoreModule.forRoot({ obj: navReducer }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
