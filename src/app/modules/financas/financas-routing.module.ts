import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FinancasComponent } from "./financas.component";
import { AuthGuard } from "../../shared/guards/auth.guard";
import { FinancasContasComponent } from "./financas-contas/financas-contas.component";
import { FinancasDashboardComponent } from "./financas-dashboard/financas-dashboard.component";
import { FinancasTransacoesComponent } from "./financas-transacoes/financas-transacoes.component";

const routes: Routes = [
  {
    path: '',
    component: FinancasComponent,
    canActivate: [AuthGuard],
    data: { breadcrumb: 'Finanças', breadcrumbUrl: 'financas' },
    children: [
      {
        path: 'dashboard',
        component: FinancasDashboardComponent,
        data: {
          roles: ['DUCK_ADM'],
          breadcrumb: 'Dashboard',
        },
      },
      {
        path: 'contas',
        component: FinancasContasComponent,
        data: {
          roles: ['DUCK_ADM'],
          breadcrumb: 'Contas'
        },
      },
      {
        path: 'transacoes',
        component: FinancasTransacoesComponent,
        data: {
          roles: ['DUCK_ADM'],
          breadcrumb: 'Transações'
        },
      },
      { path: '**', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FinancasRoutingModule { }
