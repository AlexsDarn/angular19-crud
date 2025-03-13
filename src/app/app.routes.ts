import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'users', loadChildren: () => import('./features/users/user.routes').then(m => m.default()) },
  { path: '', redirectTo: 'users', pathMatch: 'full' }
];
