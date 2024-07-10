import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { ReactiveFormsModule, Form } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { SharedModule } from '../shared/shared.module';

import { FormsModule } from '@angular/forms';
import { AsignacionRoutingModule } from '../asignacion/asignacion-routing.module';
import { MovimientoComponent } from './pages/movimiento/movimiento.component';
import { HistorialMovimientoComponent } from './pages/historial-movimiento/historial-movimiento.component';
import { RestablecerMovimientoComponent } from './components/restablecer-movimiento/restablecer-movimiento.component';
import { MovimientoRoutingModule } from './movimiento-routing.module';


@NgModule({
  declarations: [

    MovimientoComponent,
    HistorialMovimientoComponent,
    RestablecerMovimientoComponent,

  ],
  imports: [
    IonicModule,
    CommonModule,
    PrimeNgModule,
    ReactiveFormsModule,
    MovimientoRoutingModule,
    SharedModule,
    FormsModule
  ]


})
export class MovimientoModule { }
