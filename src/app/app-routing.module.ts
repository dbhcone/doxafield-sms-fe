import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard.component';
import { AcademicsComponent } from './components/home/academics/academics.component';
import { HomeDashboardComponent } from './components/home/dashboard/home-dashboard.component';
import { FinanceComponent } from './components/home/finance/finance.component';
import { HrComponent } from './components/home/hr/hr.component';
import { SettingsComponent } from './components/home/settings/settings.component';
import { StudentsComponent } from './components/home/students/students.component';
import { AdminLayoutComponent } from './components/shared/admin-layout/admin-layout.component';
import { LoginComponent } from './components/shared/login/login.component';
import { MainLayoutComponent } from './components/shared/main-layout/main-layout.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'logout', redirectTo: 'login' },
  // #region main layout section 
  {
    path: 'home',
    component: MainLayoutComponent,
    children: [
      { path: 'dashboard', component: HomeDashboardComponent },
      { path: 'hr', component: HrComponent },
      { path: 'finance', component: FinanceComponent },
      { path: 'settings', component: SettingsComponent },
      { path: 'academics', component: AcademicsComponent },
      {path: "students", component: StudentsComponent}
    ],
  },
  // #endregion

  // #region admin layout section 
  {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [{ path: 'dashboard', component: AdminDashboardComponent }],
  },
  // #endregion
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
