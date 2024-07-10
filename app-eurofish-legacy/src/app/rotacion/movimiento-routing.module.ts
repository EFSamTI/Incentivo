import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovimientoComponent } from './pages/movimiento/movimiento.component';
import { HistorialMovimientoComponent } from './pages/historial-movimiento/historial-movimiento.component';

const routes: Routes = [

  {
    path: 'movimiento',
    children: [
      {
        path: '',
        component: MovimientoComponent,
      },
      {
        path: 'historial',
        component: HistorialMovimientoComponent,
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class MovimientoRoutingModule { }