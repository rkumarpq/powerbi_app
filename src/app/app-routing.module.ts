import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SidenavComponent } from './sidenav/sidenav.component';
import { TableauComponent } from './tableau/tableau.component';

const routes: Routes = [
  {
    component: SidenavComponent,
    path:''
  },
  {
    component:TableauComponent,
    path:'tableau'
  }
  ,
  {
    component:TableauComponent,
    path:'powerbiapp/tableau'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const RoutingComponents = [SidenavComponent,TableauComponent]