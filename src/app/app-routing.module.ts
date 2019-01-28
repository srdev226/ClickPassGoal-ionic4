import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserListsComponent } from './user-lists/user-lists.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

const routes: Routes = [{
    path: '',
    redirectTo: 'user-lists',
    pathMatch: 'full'
  },
  { path: 'user-lists', component: UserListsComponent, data: {animation: 'HomePage'} },
  { path: 'user-lists/:filterData', component: UserListsComponent, data: {animation: 'HomePage'} },
  { path: 'user-profile/:slug', component: UserProfileComponent, data: {animation: 'AboutPage'} },
];
@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }

