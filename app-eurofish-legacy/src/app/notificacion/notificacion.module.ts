import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { ReactiveFormsModule, Form } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { SharedModule } from '../shared/shared.module';

import { FormsModule } from '@angular/forms';
import { OrdenFabricacionComponent } from './pages/orden-fabricacion/orden-fabricacion.component';
import { NotificacionRoutingModule } from './notificacion-routing.module';


@NgModule({
  declarations: [
    OrdenFabricacionComponent
  ],
  imports: [
    IonicModule,
    CommonModule,
    PrimeNgModule,
    ReactiveFormsModule,
    NotificacionRoutingModule,
    SharedModule,
    FormsModule
  ]
})
export class NotificacionModule { }
