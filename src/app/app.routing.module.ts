import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './modules/notfound/not-found.component';
import { AuthGuard } from './shared/guards/auth.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path: 'users',
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/user/user.module').then(m => m.UserModule)
  },
  {
    path: 'bot',
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/bot-discord/bot-discord.module').then(m => m.BotDiscordModule)
  },
  {
    path: 'kanban',
    loadChildren: () => import('./modules/kanban/kanban.module').then(m => m.KanbanModule)
  },
  {
    path: 'ponto',
    loadChildren: () => import('./modules/ponto/ponto.module').then(m => m.PontoModule)
  },
  {
    path: 'teste',
    loadChildren: () => import('./modules/teste/teste.module').then(m => m.TesteModule)
  },
  {
    path: '404',
    component: NotFoundComponent
  },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: '/404', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
