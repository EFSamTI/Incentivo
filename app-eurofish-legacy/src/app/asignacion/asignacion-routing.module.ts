import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AsinacionComponent } from '../asignacion/pages/asinacion/asinacion.component';

const routes: Routes = [
  {
    path: 'asignacion',
    component: AsinacionComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class AsignacionRoutingModule { }