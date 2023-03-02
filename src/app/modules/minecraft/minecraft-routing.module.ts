import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MinecraftComponent } from "./minecraft.component";
import { PaperMcComponent } from "./papermc/paper-mc.component";

const routes: Routes = [
  {
    path: '',
    component: MinecraftComponent,
    data: { breadcrumb: 'Minecraft' },
    children: [
      {
        path: 'papermc',
        component: PaperMcComponent,
        data: {
          breadcrumb: 'PaperMC'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MinecraftRoutingModule { }
