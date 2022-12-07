import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {KanbanComponent} from './kanban.component';
import {KanbanRoutingModule} from './kanban.routing.module';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {ButtonModule} from 'primeng/button';
import {RippleModule} from 'primeng/ripple';
import {DialogModule} from 'primeng/dialog';
import {InputTextModule} from 'primeng/inputtext';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '../../shared/shared.module';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {MessageModule} from 'primeng/message';
import {KeyFilterModule} from 'primeng/keyfilter';

@NgModule({
  declarations: [
    KanbanComponent
  ],
  imports: [
      CommonModule,
      KanbanRoutingModule,
      DragDropModule,
      ButtonModule,
      RippleModule,
      DialogModule,
      InputTextModule,
      FormsModule,
      SharedModule,
      AutoCompleteModule,
      MessageModule,
      KeyFilterModule,
      ReactiveFormsModule
  ]
})
export class KanbanModule { }
