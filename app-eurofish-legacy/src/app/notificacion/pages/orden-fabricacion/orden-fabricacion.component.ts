import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { tunos } from 'src/app/asignacion/interfaces/ariel';
import { IOrdenFabricacion } from '../../interfaces/orden-fabricacion';
import { UiServiceService } from 'src/app/shared/services/ui-service.service';

@Component({
  selector: 'app-orden-fabricacion',
  templateUrl: './orden-fabricacion.component.html',
})
export class OrdenFabricacionComponent  implements OnInit {

  constructor(private navCtrl: NavController, private ui:UiServiceService) { }

  ngOnInit() { }
  date?:string;

  turnos: string[] = tunos;
  selectTurno?:string;
  isLoading = false;

  ofs: string[] = []
  selectOf?:string;

  ofsDetalles: IOrdenFabricacion[] = [
    { tipo: 'KILOS SJ 3-4 LB'},
    { tipo: 'ROLLO FILL'},
    { tipo: 'TIEMPO EMPRRILLADO'},
    { tipo: 'TIEMPO COCINADO' },
    { tipo: 'MOD'},

  ]

  clonedOrdenFabricacion: { [s: string]: IOrdenFabricacion; } = {};

  goHome() {
    this.navCtrl.navigateBack('/dashboard');
  }

  getOrdenFabricacion() {
    this.ofs =  ['OF-0001', 'OF-0002', 'OF-0003', 'OF-0004', 'OF-0005', 'OF-0006', 'OF-0007', 'OF-0008', 'OF-0009', 'OF-0010'];
  }

  onRowEditInit(of: IOrdenFabricacion) {
    this.clonedOrdenFabricacion[of.tipo] = { ...of };
  }

  onRowEditSave(of: IOrdenFabricacion) {
    if (of.tipo) {
      delete this.clonedOrdenFabricacion[of.tipo];
      this.ui.presentToast('Orden de fabricación actualizada');
    }else{
      this.ui.presentToast('No se puede actualizar la orden de fabricación');
    }
  }

  onRowEditCancel(of: IOrdenFabricacion, index: number) {
    this.ofsDetalles[index] = this.clonedOrdenFabricacion[of.tipo];
    delete this.clonedOrdenFabricacion[of.tipo];
  }

}
