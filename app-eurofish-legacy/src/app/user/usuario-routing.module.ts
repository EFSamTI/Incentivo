import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { AdminUsuariosComponent } from './pages/admin-usuarios/admin-usuarios.component';
import { AdminRolesComponent } from './pages/admin-roles/admin-roles.component';


const routes: Routes = [
  {
    path: 'perfil',
    component: HomePageComponent,
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