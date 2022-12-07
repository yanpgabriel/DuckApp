import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {KanbanComponent} from './kanban.component';

const routes: Routes = [
  {
    path: '',
    component: KanbanComponent,
    data: {
      breadcrumb: 'system.menu.kanban'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KanbanRoutingModule { }
