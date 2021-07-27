import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard.component';
import { HomeDashboardComponent } from './components/home/dashboard/home-dashboard.component';
import { AdminLayoutComponent } from './components/shared/admin-layout/admin-layout.component';
import { LoginComponent } from './components/shared/login/login.component';
import { MainLayoutComponent } from './components/shared/main-layout/main-layout.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'logout', redirectTo: 'login' },
  // main layout section begin
  {
    path: 'home',
    component: MainLayoutComponent,
    children: [{ path: 'dashboard', component: HomeDashboardComponent }],
  },


  // admin layout section begin
  {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [{ path: 'dashboard', component: AdminDashboardComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
