import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListUserComponent } from './list/list-user.component';
import { AuthGuard } from '../../shared/guards/auth.guard';
import { CreateUserComponent } from './create/create-user.component';
import { UserComponent } from "./user.component";

const routes: Routes = [

  {
    path: '',
    canActivate: [AuthGuard],
    component: UserComponent,
    data: {
      roles: ['DUCK_ADM', 'USER_LIST'],
      breadcrumb: 'system.menu.users',
      breadcrumbUrl: 'users'
    },
    children: [
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
      {
        path: 'edit/:idUser',
        canActivate: [AuthGuard],
        component: CreateUserComponent,
        data: {
          roles: ['DUCK_ADM', 'USER_CREATE'],
          breadcrumb: 'Editar'
        },
      },
      {
        path: 'profiles',
        loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule)
      },
      { path: '**', redirectTo: 'list', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
