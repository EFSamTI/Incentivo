import { Component, OnInit } from '@angular/core';
import { ParadaService } from '../../services/parada.service';
import { UiServiceService } from 'src/app/shared/services/ui-service.service';
import { formatDate } from '@angular/common';

import { MenuItem } from 'primeng/api';
import {  NavController } from '@ionic/angular';
import { ILinea } from 'src/app/asignacion/interfaces/linea';
import { LineaService } from 'src/app/asignacion/services/linea.service';
import { IParada, IFilterParada, IParadaUpdate } from '../../interfaces/paradas';
import { tunos } from '../../../asignacion/interfaces/ariel';

@Component({
  selector: 'app-mantenimiento-paradas',
  templateUrl: './mantenimiento-paradas.component.html',
})


export class MantenimientoParadasComponent implements OnInit {
  constructor(
    private ui: UiServiceService,
    private paradaService: ParadaService,
    private lineaService: LineaService,
    private navCtrlr: NavController,
  ) {}
  breadcrumbItems: MenuItem[] = [
    { label: 'Crear parada' },
    { label: 'Mantenimiento paradas' },
  ];

  hora_inicio?: string;
  hora_fin?: string;
  isLoading = false;



  listParadas: IParada[] = [];
  selectParada?: IParada;
  selectParadas: IParada[] = [];

  copyListParadas: IParada[] = [];
  dialogForm = false;

  turnos = tunos;
  selectTurno?: string;

  filterFecha?: string;

  lineas: ILinea[] = [];
  selectLinea?: ILinea;

  ngOnInit() {
    this.loadLineas();
  }
  loadLineas() {
    this.lineaService.getLinea().subscribe({
      next: (response) => {
        this.lineas = response;
      },
      error: () => {
        this.ui.alertaInformativa('Error al cargar lineas');
      },
    });
  }

  loadParadas(filter:IFilterParada ) {
    this.isLoading = true;
    this.paradaService.getParadas(filter).subscribe({
      next: (resp) => {
        this.listParadas = resp;
        this.copyListParadas = resp;
        this.isLoading = false;
      },
      error: (err) => {
        this.ui.alertaInformativa(err.error || err.message);
        this.isLoading = false;
      },
    });
  }
  updateParada() {
    this.isLoading = true;
    if (!this.selectParada) {
      this.ui.presentToast('Debe seleccionar una parada');
      this.isLoading = false; 
      return;
    }
  
    if (!this.hora_inicio || !this.hora_fin) {
      this.ui.presentToast('Debe ingresar la hora de inicio y fin');
      this.isLoading = false; 
      return;
    }
  
    const updateParada: IParadaUpdate = {
      paradaid: this.selectParada.paradaid,
      hora_inicio: this.hora_inicio,
      hora_fin: this.hora_fin,
    };
  
    this.paradaService.actulizarParada(updateParada).subscribe({
      next: (resp) => {
        this.ui.presentToast('Parada actualizada');
        if (this.selectParada) {
          const index = this.listParadas.findIndex(p => p.paradaid === this.selectParada?.paradaid);
          if (index !== -1) {
            this.listParadas[index].hora_inicio = this.hora_inicio!;
            this.listParadas[index].hora_fin = this.hora_fin!;
          }
        };
        this.dialogForm = false;
        this.hora_inicio = undefined;
        this.hora_fin = undefined;
        this.isLoading = false; 
      },
      error: (error) => {
        this.ui.presentToast(error.error || error.message);
        this.isLoading = false; 
      },
    });
  }

  eliminarParada(id: number) {
    this.paradaService.eliminarParada(id).subscribe({
      next: () => {
        this.ui.presentToast('Parada eliminada');
        this.listParadas = this.listParadas.filter(p => p.paradaid !== id);
      },
      error: (error) => {
        this.ui.presentToast(error.error || error.message);
      },
    });
  }

  enviarParada() {
    if (!this.selectParadas) return;
    let tiempoParada: string = '';
    let listParadasWithTiempoParada: any[] = [];
    this.selectParadas.forEach((parada) => {
      let horaInicio = new Date(parada.hora_inicio);
      let horaFin = new Date(parada.hora_fin);
      let tiempo = horaFin.getTime() - horaInicio.getTime();
      let tiempoMinutos = Math.floor(tiempo / 60000);
      tiempoParada = tiempoMinutos.toString();
      listParadasWithTiempoParada.push({
        paradaid: parada.paradaid,
        empleado: parada.empleado,
        tiempo: tiempoParada + ' minutos ',
        centro_costo: parada.centro_costo,
        linea: parada.nombrelinea,
        turno: parada.nombre_turno,
        hora_inicio: parada.hora_inicio,
        hora_fin: parada.hora_fin,

      });
    });
    console.log(listParadasWithTiempoParada);
  }

  openDialog(parada: IParada) {
    this.hora_inicio = this.formatDateToDateTimeLocal(parada.hora_inicio);
    this.hora_fin = this.formatDateToDateTimeLocal(parada.hora_fin);
    this.selectParada = parada;
    this.dialogForm = true;
  }
  formatDateToDateTimeLocal(dateString: string): string {
    return formatDate(dateString, 'yyyy-MM-ddTHH:mm', 'en-US');
  }

  close() {
    this.dialogForm = false;
    this.hora_inicio = undefined;
    this.hora_fin = undefined;
  }
   filterList: IFilterParada = {};
  obtenerData() {
    if (this.filterFecha) {
      this.filterList.fecha = this.filterFecha;
    }
    if (this.selectLinea) {
      this.filterList.linea = this.selectLinea.nombrelinea;
    }
    if (this.selectTurno) {
      this.filterList.turno = this.selectTurno;
    }
    this.loadParadas( this.filterList);
  }

  goHome() {
    this.navCtrlr.navigateBack('/dashboard');
  }

  goParadas() {
    this.navCtrlr.navigateBack('/parada');
  }
}
