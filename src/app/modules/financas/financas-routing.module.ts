import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FinancasComponent } from "./financas.component";
import { ContasComponent } from "./contas/contas.component";

const routes: Routes = [
  { path: 'dashboard', component: FinancasComponent },
  { path: 'contas', component: ContasComponent },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FinancasRoutingModule { }
