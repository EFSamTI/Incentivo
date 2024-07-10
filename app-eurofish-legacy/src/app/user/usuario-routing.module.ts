import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { HomePageComponent } from './pages/home-page/home-page.component';
import { LayoutPageComponent } from '../shared/pages/layout-page/layout-page.component';
import { AdminUsuariosComponent } from './pages/admin-usuarios/admin-usuarios.component';
import { AdminRolesComponent } from './pages/admin-roles/admin-roles.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';


const routes: Routes = [
  {
    path: 'perfil',
    component: HomePageComponent,


  },
 {
    path: 'dashboard',
    component: DashboardComponent,
    

  },
  {
    path: 'admin-users',
    component: AdminUsuariosComponent,


  },

  {
    path: 'admin-roles',
    component: AdminRolesComponent,
  }

   
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class UsuarioRoutingModule { }