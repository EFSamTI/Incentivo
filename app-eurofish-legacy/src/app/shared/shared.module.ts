import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { LoadingScreamComponent } from './components/loading-scream/loading-scream.component';

import { SliderMenuComponent } from './components/slider-menu/slider-menu.component';
import { IonicModule } from '@ionic/angular';

import { ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from './components/footer/footer.component';
import { SliderBarComponent } from './components/slider-bar/slider-bar.component';
import { RouterModule } from '@angular/router';
import { AppMenuitemComponent } from './components/slider-menu/app.menuitem.component';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
  declarations: [
    LoadingScreamComponent,
    HeaderComponent,
    SliderMenuComponent,
    FooterComponent,
    SliderBarComponent,
    AppMenuitemComponent,
    LayoutPageComponent,
  ],
  imports: [
    IonicModule,
    CommonModule,
    PrimeNgModule,
    ReactiveFormsModule,
    RouterModule,
    
  ],
  exports: [
    LoadingScreamComponent,
    HeaderComponent,
    SliderMenuComponent,
    FooterComponent,
    SliderBarComponent,
    
    
  ]
})
export class SharedModule { }