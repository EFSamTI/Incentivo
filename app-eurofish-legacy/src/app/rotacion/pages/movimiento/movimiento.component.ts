import { Component, OnInit } from '@angular/core';

import { UiServiceService } from '../../../shared/services/ui-service.service';
import { Subject, debounceTime } from 'rxjs';
import { NavController } from '@ionic/angular';
import { MenuItem } from 'primeng/api';
import { cargos, lineas, tunos } from 'src/app/asignacion/interfaces/ariel';
import { EmpleadoService } from 'src/app/asignacion/services/empleado.service';
import { IAsignacion, IFilterAsignaciones } from '../../interfaces/movimiento';
import { MovimientoService } from '../../services/movimiento.service';
import { IArea } from '../../interfaces/area';
import { AreaService } from '../../services/area.service';

@Component({
  selector: 'app-movimiento',
  templateUrl: './movimiento.component.html'
})
export class MovimientoComponent {

  isLoading = false;
  isLoadinMovimientos = false;

  listAsignaciones: IAsignacion[] = [];
  copyAsignaciones: IAsignacion[] = [];
  originalAsignaciones: IAsignacion[] = [];
  modifAsignaciones: IAsignacion[] = [];
  selectedAsignaciones: IAsignacion[] = [];

  lineas = lineas;
  areas: string[] = [];

  cargos: string[] = cargos;
  tunos: string[] = tunos;

  selectLinea?: string;
  selectTurno?: string;
  dateFiltre?: string;

  searchTerm = new Subject<string>();

  constructor(private movimientoService: MovimientoService, private ui: UiServiceService, private areaService: AreaService, private navCtrl: NavController) { }

  breadcrumbItems: MenuItem[] = [
    { label: 'Rotación personal' },
  ];

  ngOnInit() {
    this.loadAreas();
  }

  loadAsignaciones() {
    let filter: IFilterAsignaciones = {};
    if (this.selectLinea) {
      filter.linea = this.selectLinea;
    }
    if (this.selectTurno) {
      filter.turno = this.selectTurno;
    }
    this.isLoading = true;
    this.movimientoService.getAsignaciones(filter).subscribe({
      next: (response) => {
        this.listAsignaciones = response;
        this.copyAsignaciones = response;
        this.originalAsignaciones = JSON.parse(JSON.stringify(response));
        this.isLoading = false;
      },
      error: (error) => {
        this.ui.alertaInformativa(error.error || error.message);
        this.listAsignaciones = [];
        this.isLoading = false;
      },
    });
  }

  loadAreas() {
    this.areaService.getAreas().subscribe({
      next: (response) => {
        this.areas = response.map((area: IArea) => area.nombre_area);
      },
      error: () => {
        this.ui.alertaInformativa('Error al cargar areas');
      },
    });
  }

  navHistorialMovimiento() {
    this.navCtrl.navigateForward('/movimiento/historial');
  }

  onCargoChange(cargo: IAsignacion) {
    const modifiItem = { ...cargo };
    this.updateModifiedAsignaciones(modifiItem);
  }

  onAreaChange(area: IAsignacion) {
    const modifiItem = { ...area };
    this.updateModifiedAsignaciones(modifiItem);
  }

  updateModifiedAsignaciones(modifiItem: IAsignacion) {
    const index = this.modifAsignaciones.findIndex(item => item.asignacionid === modifiItem.asignacionid);
    if (index > -1) {
      this.modifAsignaciones[index] = modifiItem;
    } else {
      this.modifAsignaciones.push(modifiItem);
    }
  }

  onLineaChange(linea: string) {
    this.selectLinea = linea;

  }

  onTurnoChange(turno: string) {
    this.selectTurno = turno;

  }

  onDataChange() {
    const filteredModifAsignaciones = this.modifAsignaciones.filter(modifAsignacion =>
      this.selectedAsignaciones.some(selectedAsignacion => selectedAsignacion.asignacionid === modifAsignacion.asignacionid)
    );
    const listModify = filteredModifAsignaciones.map(asignacion => {
      const change: IChanges = {
        asignacionid: asignacion.asignacionid,
        area: asignacion.nombre_area,
        cargo: asignacion.cargoname
      };
      return change;
    });
    this.movimientoService.postCambios(listModify).subscribe({
      next: () => {
        this.ui.presentToast('Cambios guardados');
        this.loadAsignaciones();
        this.modifAsignaciones = [];
        this.selectedAsignaciones = [];
      },
      error: (error) => {
        console.log(error);
        this.ui.alertaInformativa('Error al guardar cambios');
      }
    });
  }
  goHome() {
    this.navCtrl.navigateBack('/dashboard');
  }
}

interface IChanges {
  asignacionid: number;
  area: string;
  cargo: string;
}