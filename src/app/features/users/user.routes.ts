import { Routes } from '@angular/router';
import { HomeComponent } from '../home/components/home/home.component';
import { ViewUsersComponent } from './components/view-users/view-users.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';

export default function userRoutes(): Routes {
  return [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'view-user/:userId', component: ViewUsersComponent },
    { path: 'add-user', component: AddUserComponent },
    { path: 'edit-user/:userId', component: EditUserComponent }
  ];
}