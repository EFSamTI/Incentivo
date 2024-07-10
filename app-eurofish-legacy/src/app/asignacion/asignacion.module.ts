import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { ReactiveFormsModule, Form } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { SharedModule } from '../shared/shared.module';

import { FormsModule } from '@angular/forms';
import { AsinacionComponent } from '../asignacion/pages/asinacion/asinacion.component';
import { AsignacionRoutingModule } from '../asignacion/asignacion-routing.module';
import { QuiebreComponent } from '../asignacion/pages/quiebre/quiebre.component';


@NgModule({
  declarations: [
    AsinacionComponent,
    QuiebreComponent,

  ],
  imports: [
    IonicModule,
    CommonModule,
    PrimeNgModule,
    ReactiveFormsModule,
    AsignacionRoutingModule,
    SharedModule,
    FormsModule
  ]


})
export class AsignacionModule { }
