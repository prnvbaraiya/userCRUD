import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddUsersComponent } from './pages/add-users/add-users.component';
import { UpdateUsersComponent } from './pages/update-users/update-users.component';
import { ViewUsersComponent } from './pages/view-users/view-users.component';

const routes: Routes = [
  {
    path: 'user',
    children: [
      { path: '', title: 'View User', component: ViewUsersComponent },
      { path: 'add', title: 'Add User', component: AddUsersComponent },
      {
        path: 'edit/:user_id',
        title: 'Update User',
        component: UpdateUsersComponent,
      },
    ],
  },
  { path: '**', pathMatch: 'full', redirectTo: '/user' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
