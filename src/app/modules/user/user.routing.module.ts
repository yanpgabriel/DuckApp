import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ListUserComponent} from './list/list-user.component';
import {AuthGuard} from '../../shared/guards/auth.guard';
import {CreateUserComponent} from './create/create-user.component';

const routes: Routes = [
  {
    path: 'create',
    canActivate: [AuthGuard],
    component: CreateUserComponent,
    data: {
      roles: ['DUCK_ADM', 'USER_CREATE'],
      breadcrumb: 'Criar'
    },
  },
  {
    path: 'list',
    canActivate: [AuthGuard],
    component: ListUserComponent,
    data: {
      roles: ['DUCK_ADM', 'USER_LIST'],
      breadcrumb: 'Listar'
    },
  },
  { path: '', redirectTo: 'list', pathMatch: 'full',
    data: { breadcrumb: 'system.menu.users' }, }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
