import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CoursesComponent }   from './courses/courses.component';
import { ProfileComponent }   from './profile/profile.component';
import { ErrorComponent }     from './error/error.component';

export const routes: Routes = [
  { path: '',            redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard',  component: DashboardComponent },
  { path: 'courses',    component: CoursesComponent   },
  { path: 'course/:id', component: CoursesComponent   },
  { path: 'profile',    component: ProfileComponent   },
  { path: '**',         component: ErrorComponent     }
];