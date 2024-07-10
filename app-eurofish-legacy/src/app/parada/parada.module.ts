import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { ReactiveFormsModule, Form } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { SharedModule } from '../shared/shared.module';

import { FormsModule } from '@angular/forms';

import { MantenimientoParadasComponent } from './components/mantenimiento-paradas/mantenimiento-paradas.component';
import { ParadasComponent } from './pages/paradas/paradas.component';
import { ParadaRoutingModule } from './parada-routing.module';


@NgModule({
  declarations: [

    ParadasComponent,

    MantenimientoParadasComponent
  ],
  imports: [
    IonicModule,
    CommonModule,
    PrimeNgModule,
    ReactiveFormsModule,
    ParadaRoutingModule,
    SharedModule,
    FormsModule
  ]


})
export class ParadaModule { }
