import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { ReactiveFormsModule, Form } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { SharedModule } from '../shared/shared.module';

import { FormsModule } from '@angular/forms';
import { ConfigRoutingModule } from './config-routing.module';
import { ConfigRequestComponent } from './pages/config-request/config-request.component';
import { FormConfigComponent } from './components/form-config/form-config.component';


@NgModule({
  declarations: [
    ConfigRequestComponent,
    FormConfigComponent

  ],
  imports: [
    IonicModule,
    CommonModule,
    PrimeNgModule,
    ReactiveFormsModule,
    ConfigRoutingModule,
    SharedModule,
    FormsModule
  ]


})
export class ConfigModule { }
