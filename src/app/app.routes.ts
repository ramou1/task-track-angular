import { Routes } from '@angular/router';
import { APP_ROUTES } from './constants/routes.const';
import { authGuard, guestGuard } from './guards/auth.guard';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { UsersComponent } from './pages/users/users.component';

export const routes: Routes = [
  {
    path: APP_ROUTES.LOGIN,
    component: LoginComponent,
    canActivate: [guestGuard],
  },
  {
    path: APP_ROUTES.DASHBOARD,
    component: DashboardComponent,
    canActivate: [authGuard],
  },
  {
    path: APP_ROUTES.USERS,
    component: UsersComponent,
    canActivate: [authGuard],
  },
  {
    path: APP_ROUTES.PROFILE,
    component: ProfileComponent,
    canActivate: [authGuard],
  },
  {
    path: APP_ROUTES.TASKS,
    redirectTo: APP_ROUTES.DASHBOARD,
    pathMatch: 'full',
  },
  {
    path: '',
    redirectTo: APP_ROUTES.DASHBOARD,
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: APP_ROUTES.DASHBOARD,
  },
];
