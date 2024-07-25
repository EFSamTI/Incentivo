import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AsinacionComponent } from '../asignacion/pages/asinacion/asinacion.component';
import { AsignacionV2Component } from './pages/asignacion-v2/asignacion-v2.component';

const routes: Routes = [
  {
    path: 'asignacion',
    component: AsinacionComponent,
  },  
  {
    path: 'asignacion-v2',
    component: AsignacionV2Component,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class AsignacionRoutingModule { }