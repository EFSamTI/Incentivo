import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { ReactiveFormsModule, Form } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { SharedModule } from '../shared/shared.module';

import { FormsModule } from '@angular/forms';
import { ApisTallyRoutingModule } from './api-tally-routing.module';
import { LectorApisTallyComponent } from './pages/quiebre/lector-apis-tally.component';


@NgModule({
  declarations: [

LectorApisTallyComponent,
  ],
  imports: [
    IonicModule,
    CommonModule,
    PrimeNgModule,
    ReactiveFormsModule,
    ApisTallyRoutingModule,
    SharedModule,
    FormsModule
  ]


})
export class ApisTallyModule { }
