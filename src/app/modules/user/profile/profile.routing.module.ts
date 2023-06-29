import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from "../../../shared/guards/auth.guard";
import { ProfileComponent } from "./profile.component";
import { ListProfileComponent } from "./list/list-profile.component";

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    component: ProfileComponent,
    data: {
      roles: ['DUCK_ADM'],
      breadcrumb: 'system.menu.profiles',
      breadcrumbUrl: 'profiles'
    },
    children: [
      {
        path: 'list',
        canActivate: [AuthGuard],
        component: ListProfileComponent,
        data: {
          roles: ['DUCK_ADM'],
          breadcrumb: 'Listar'
        },
      },
      {
        path: 'roles',
        loadChildren: () => import('./role/role.module').then(m => m.RoleModule)
      },
      { path: '**', redirectTo: 'list', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
