import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { ReactiveFormsModule, Form } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HomePageComponent } from './pages/home-page/home-page.component';


import { UsuarioRoutingModule } from './usuario-routing.module';
import { SharedModule } from '../shared/shared.module';

import { AuthModule } from '../auth/auth.module';
import { FormsModule } from '@angular/forms';
import { AdminUsuariosComponent } from './pages/admin-usuarios/admin-usuarios.component';
import { FormUserComponent } from './components/form-user/form-user.component';
import { AdminRolesComponent } from './pages/admin-roles/admin-roles.component';
import { FormRolComponent } from './components/form-rol/form-rol.component';

@NgModule({
  declarations: [

    HomePageComponent,
    AdminUsuariosComponent,
    FormUserComponent,
    AdminRolesComponent,
    FormRolComponent
  ],
  imports: [
    IonicModule,
    CommonModule,
    PrimeNgModule,
    UsuarioRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    AuthModule,
    FormsModule
  ]


})
export class UsuarioModule { }
