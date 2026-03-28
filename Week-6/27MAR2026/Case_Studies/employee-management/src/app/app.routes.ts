import { Routes } from '@angular/router';
import { Login } from './auth/login/login.component';
import { EmployeeListComponent } from './employee/employee-list/employee-list.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
    { path: 'login', component: Login },
    { path: 'employees', component: EmployeeListComponent, canActivate: [authGuard] },
    { path: '', redirectTo: 'employees', pathMatch: 'full' },
];
