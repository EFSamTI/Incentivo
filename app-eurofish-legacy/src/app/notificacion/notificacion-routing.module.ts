import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrdenFabricacionComponent } from './pages/orden-fabricacion/orden-fabricacion.component';


const routes: Routes = [
  {
    path: 'notificacion/orden-fabricacion',
    component: OrdenFabricacionComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class NotificacionRoutingModule { }