import { Component, OnInit } from '@angular/core';
import { cargos } from 'src/app/asignacion/interfaces/ariel';
import { ILinea } from 'src/app/asignacion/interfaces/linea';
import { LineaService } from 'src/app/asignacion/services/linea.service';
import { UiServiceService } from 'src/app/shared/services/ui-service.service';
import { IMovimiento, IFilterCambios, Empleado } from '../../interfaces/movimiento';
import { MovimientoService, IChanges } from '../../services/movimiento.service';
import { AreaService } from '../../services/area.service';
import { IArea } from '../../interfaces/area';


@Component({
  selector: 'app-restablecer-movimiento',
  templateUrl: './restablecer-movimiento.component.html',
})
export class RestablecerMovimientoComponent implements OnInit {
  isLoading = false;

  listCambios: IMovimiento[] = [];
  copyMovimientos: IMovimiento[] = [];
  selectMovimientos: IMovimiento[] = [];

  modifAsignaciones: IMovimiento[] = [];

  areas: string[] = [];
  cargos: string[] = cargos;

  turnos = ['turno 1', 'turno 2', 'turno 3'];
  selectTurno?: string;

  lineas: ILinea[] = [];
  selectLinea?: ILinea;

  filterList: IFilterCambios = {};

  constructor(
    private movimientoService: MovimientoService,
    private ui: UiServiceService,
    private lineaService: LineaService,
    private areaService: AreaService
  ) {}

  ngOnInit() {
    this.loadLineas();
    this.loadAreas();
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


  loadMovimientos() {
    this.isLoading = true;

    if (this.selectLinea) {
      this.filterList.linea = this.selectLinea.nombrelinea;
    }

    if (this.selectTurno) {
      this.filterList.turno = this.selectTurno;
    }
    this.movimientoService.getUltimosMovimientos(this.filterList).subscribe({
      next: (response) => {
        this.listCambios = response;
        this.copyMovimientos = response;
        this.isLoading = false;
      },
      error: (error) => {
        this.ui.alertaInformativa(error.error || error.message);
        this.listCambios = [];
        this.isLoading = false;
      },
    });
  }



  onCargoChange(cargo: IMovimiento) {
    const modifiItem = { ...cargo };
    this.updateModifiedAsignaciones(modifiItem);
  }

  onAreaChange(area: IMovimiento) {
    const modifiItem = { ...area };
    this.updateModifiedAsignaciones(modifiItem);
  }

  updateModifiedAsignaciones(modifiItem: IMovimiento) {
    const index = this.modifAsignaciones.findIndex(
      (item) => item.movimientoid === modifiItem.movimientoid
    );
    if (index > -1) {
      this.modifAsignaciones[index] = modifiItem;
    } else {
      this.modifAsignaciones.push(modifiItem);
    }
  }

  onFilterEmpleado(emplado: Empleado) {
    const filterEmpleado = this.copyMovimientos;
    if (emplado) {
      this.listCambios = filterEmpleado.filter(
        (movimiento) => movimiento.empleado_nombre === emplado.nombre
      );
    } else {
      this.listCambios = filterEmpleado;
    }
  }

  restabelcerOneMovimiento(movimiento: IMovimiento) {
    this.movimientoService.postRestablecerCambios([movimiento]).subscribe({
      next: () => {
        this.loadMovimientos();
        this.ui.presentToast('Cambios restablecidos');
      },
      error: () => {
        this.ui.alertaInformativa('Error al restablecer cambios');
      },
    });
  }

  restablecerCambios() {
    this.movimientoService
      .postRestablecerCambios(this.selectMovimientos)
      .subscribe({
        next: () => {
          this.loadMovimientos();
          this.selectMovimientos = [];
          this.ui.presentToast('Cambios restablecidos');
        },
        error: () => {
          this.ui.alertaInformativa('Error al restablecer cambios');
        },
      });
  }

  onDataChange() {
    const filteredModifAsignaciones = this.modifAsignaciones.filter(
      (modifAsignacion) =>
        this.selectMovimientos.some(
          (selectedAsignacion) =>
            selectedAsignacion.movimientoid === modifAsignacion.movimientoid
        )
    );
    const listModify = filteredModifAsignaciones.map((asignacion) => {
      const change: IChanges = {
        asignacionid: asignacion.id_original,
        area: asignacion.area_cambio,
        cargo: asignacion.cargo_cambio,
      };
      return change;
    });
    this.movimientoService.postCambios(listModify).subscribe({
      next: () => {
        this.ui.presentToast('Cambios guardados');
        this.loadMovimientos();
        this.modifAsignaciones = [];
        this.selectMovimientos = [];
      },
      error: () => {
        this.ui.alertaInformativa('Error al guardar cambios');
      },
    });
  }
}
