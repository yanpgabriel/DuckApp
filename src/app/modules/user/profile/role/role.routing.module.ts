import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from "../../../../shared/guards/auth.guard";
import { RoleComponent } from "./role.component";
import { ListRoleComponent } from "./list/list-role.component";

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    component: RoleComponent,
    data: {
      roles: ['DUCK_ADM'],
      breadcrumb: 'system.menu.roles',
      breadcrumbUrl: 'roles'
    },
    children: [
      {
        path: 'list',
        canActivate: [AuthGuard],
        component: ListRoleComponent,
        data: {
          roles: ['DUCK_ADM'],
          breadcrumb: 'Listar'
        },
      },
      { path: '**', redirectTo: 'list', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoleRoutingModule { }
