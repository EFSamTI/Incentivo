import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { tunos } from 'src/app/asignacion/interfaces/ariel';
import { IOrdenFabricacion, IOrdenFabricacionRecursos } from '../../interfaces/orden-fabricacion';
import { UiServiceService } from 'src/app/shared/services/ui-service.service';
import { OrdenFabricacionService } from '../../services/orden-fabricacion.service';

@Component({
  selector: 'app-orden-fabricacion',
  templateUrl: './orden-fabricacion.component.html',
})
export class OrdenFabricacionComponent  implements OnInit {

  constructor(private navCtrl: NavController, private ui:UiServiceService, private ordenFabricacionService: OrdenFabricacionService) { }

  ngOnInit() { }
  date?:string;

  turnos: string[] = tunos;
  selectTurno?:string;
  isLoading = false;

  ofs: string[] = []
  selectOf?:string;

  ofsDetalles: IOrdenFabricacionRecursos[] = []

  clonedOrdenFabricacion: { [s: string]: IOrdenFabricacionRecursos; } = {};

  goHome() {
    this.navCtrl.navigateBack('/dashboard');
  }

  getOrdenFabricacion() {
    this.ofs =  ['OF-0001', 'OF-0002', 'OF-0003', 'OF-0004', 'OF-0005', 'OF-0006', 'OF-0007', 'OF-0008', 'OF-0009', 'OF-0010'];
  }

  onRowEditInit(of: IOrdenFabricacionRecursos) {
    this.clonedOrdenFabricacion[of.tipo] = { ...of };
  }

  onRowEditSave(of: IOrdenFabricacionRecursos) {
    if (of.tipo) {
      delete this.clonedOrdenFabricacion[of.tipo];
      this.ui.presentToast('Orden de fabricación actualizada');
    }else{
      this.ui.presentToast('No se puede actualizar la orden de fabricación');
    }
  }

  onRowEditCancel(of: IOrdenFabricacionRecursos, index: number) {
    this.ofsDetalles[index] = this.clonedOrdenFabricacion[of.tipo];
    delete this.clonedOrdenFabricacion[of.tipo];
  }


  onSelectOfChange(event: any) {
    this.selectOf = event.value;

    this.ofsDetalles = [
      { codigo_posicion: '0001', tipo: 'KILOS SJ 3-4 LB', cantidad: 100, um: 'KG' },
      { codigo_posicion: '0002', tipo: 'ROLLO FILL', cantidad: 200, um: 'ROLLO' },
      { codigo_posicion: '0003', tipo: 'TIEMPO EMPRRILLADO', cantidad: 300, um: 'MIN' },
      { codigo_posicion: '0004', tipo: 'TIEMPO COCINADO', cantidad: 400, um: 'MIN' },
      { codigo_posicion: '0005', tipo: 'MOD', cantidad: 500, um: 'KG' }
    ];
  }

  ordenFabricacion?: IOrdenFabricacion;
  onSaveOrdenFabricacion() {
    if (!this.selectOf || !this.selectTurno || !this.date) {
      this.ui.presentToast('Por favor, complete los campos obligatorios');
      return;
    }
    this.ordenFabricacion = {
      numero_orden: this.selectOf,
      nivel_orden: '1',
      tipo_ingreso: 'AUTOMATICO',
      fecha_produccion: this.date,
      turno: this.selectTurno,
      recursos: this.ofsDetalles
    };

    console.log(this.ordenFabricacion);

    this.isLoading = true;
    this.ordenFabricacionService.createOrdenFabricacion(this.ordenFabricacion).subscribe(
 {
        next: (resp) => {
          console.log(resp);
          this.ui.presentToast('Orden de fabricación creada');
          this.isLoading = false;
        },
        error: (err) => {
          console.log(err);
          this.ui.presentToast('Error al crear la orden de fabricación');
          this.isLoading = false;
        }
 }
    );
  }

}
