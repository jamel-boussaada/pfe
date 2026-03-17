import { Routes } from '@angular/router';
import { EsignLayoutComponent } from './layouts/esign-layout/esign-layout.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { SigningComponent } from './features/signing/signing.component';
import { ProcessDetailComponent } from './features/process-detail/process-detail.component';
import { LoginComponent } from './features/auth/login/login.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    component: EsignLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'signing/:id',
        component: SigningComponent
      },
      {
        path: 'process/:id',
        component: ProcessDetailComponent
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];
