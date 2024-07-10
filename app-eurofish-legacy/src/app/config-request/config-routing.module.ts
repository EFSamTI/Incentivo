import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfigRequestComponent } from './pages/config-request/config-request.component';
import { FormConfigComponent } from './components/form-config/form-config.component';

const routes: Routes = [
  {
    path: 'config-request',
    component: ConfigRequestComponent,
  } ,
  {
    path: 'form-config-request',
    component: FormConfigComponent,
  } 
  

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class ConfigRoutingModule { }