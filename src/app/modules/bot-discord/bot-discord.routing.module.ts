import {NgModule} from '@angular/core';
import {BotDiscordComponent} from './bot-discord.component';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from '../../shared/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    component: BotDiscordComponent,
    data: {
      roles: ['DUCK_ADM', 'BOT'],
      breadcrumb: 'system.menu.bot',
    },
  }
  // { path: '', redirectTo: 'list', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BotDiscordRountingModule { }
