import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MantenimientoParadasComponent } from './components/mantenimiento-paradas/mantenimiento-paradas.component';
import { ParadasComponent } from './pages/paradas/paradas.component';

const routes: Routes = [
  {
    path: 'parada',
    children: [
      {
        path: '',
        component: ParadasComponent,
      },
      {
        path: 'mantenimiento',
        component: MantenimientoParadasComponent,
      }
    ]

  }  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class ParadaRoutingModule { }