import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LectorApisTallyComponent } from './pages/quiebre/lector-apis-tally.component';

const routes: Routes = [
  {
    path: 'quiebre',
    component: LectorApisTallyComponent,
  },  

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class ApisTallyRoutingModule { }