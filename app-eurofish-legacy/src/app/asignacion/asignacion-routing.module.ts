import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AsinacionComponent } from '../asignacion/pages/asinacion/asinacion.component';
import { QuiebreComponent } from '../asignacion/pages/quiebre/quiebre.component';

const routes: Routes = [
  {
    path: 'asignacion',
    component: AsinacionComponent,
  },
  {
    path: 'quiebre',
    component: QuiebreComponent,
  },  

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class AsignacionRoutingModule { }