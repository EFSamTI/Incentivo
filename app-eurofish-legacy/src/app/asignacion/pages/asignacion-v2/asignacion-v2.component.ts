import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, of, forkJoin } from 'rxjs';
import { debounceTime, catchError } from 'rxjs/operators';

import { NavController } from '@ionic/angular';
import { MenuItem, Message } from 'primeng/api';
import { UiServiceService } from 'src/app/shared/services/ui-service.service';
import {
  actividades,
  Condition,
  IRequestAriel,
  IResponseAriel,
  ItemAsistencia,
  lineas,
  tunos,
} from '../../interfaces/ariel';
import { AsignacionService } from '../../services/asignacion.service';

@Component({
  selector: 'app-asignacion-v2',
  templateUrl: './asignacion-v2.component.html',
})
export class AsignacionV2Component implements OnInit {
  isLoading = false;
  searchTerm = new Subject<string>();
  comodinForm: FormGroup;
  breadcrumbItems: MenuItem[] = [{ label: 'Asignar' }];
  actividades: string[] = actividades;
  lineas: string[] = lineas;
  tunos: string[] = tunos;
  selectCargo?: string;
  selectTurno?: string;
  dateFiltre?: string;
  displayNewComodin = false;
  listResponseAriel: ItemAsistencia[] = [];
  copyListResponseAsistencia: ItemAsistencia[] = [];
  selectedAsignaciones: ItemAsistencia[] = [];
  copyListResponse: ItemAsistencia[] = [];
  requestAriel?: IRequestAriel;
  dataAriel?: IResponseAriel<ItemAsistencia>;

  constructor(
    private ui: UiServiceService,
    private asignacionService: AsignacionService,
    private fb: FormBuilder,
    private navCtrl: NavController
  ) {
    this.comodinForm = this.fb.group({
      posicion: [''],
      nombre_empleado: ['', Validators.required],
      ci_empleado: ['', Validators.required],
      centro_costo: ['', Validators.required],
      cargo: ['', Validators.required],
      hora_entrada: ['', Validators.required],
      linea: ['', Validators.required],
      turnos: [''],
      fecha_corte_remesul: [''],
      beneficios_leas: [''],
    });
  }

  ngOnInit() {
    this.searchTerm
      .pipe(debounceTime(300))
      .subscribe((search) => this.filter(search));
    this.showInfoViaMessages();
  }

  get nombre_empleado() {
    return this.comodinForm.controls['nombre_empleado'];
  }
  get ci_empleado() {
    return this.comodinForm.controls['ci_empleado'];
  }
  get centro_costo() {
    return this.comodinForm.controls['centro_costo'];
  }
  get cargo() {
    return this.comodinForm.controls['cargo'];
  }
  get hora_entrada() {
    return this.comodinForm.controls['hora_entrada'];
  }
  get linea() {
    return this.comodinForm.controls['linea'];
  }

  loadData() {
    const conditions: Condition[] = [
      { field: 'nombre_area', operator: 'EQ', value: 'PROCESO' },
      this.selectTurno && {
        field: 'turno',
        operator: 'EQ',
        value: this.selectTurno,
      },
      this.dateFiltre && {
        field: 'fecha',
        operator: 'EQ',
        value: this.dateFiltre,
      },
    ].filter(Boolean) as Condition[];

    this.requestAriel = {
      view: 'bi.vw_asistencia_planificada',
      fields: [],
      operators: [],
      conditions,
      order: [
        { field: 'nombre_persona', order: 'DESC', option: 'LAST' },
        { field: 'cedula' },
      ],
    };

    this.isLoading = true;
    this.asignacionService.obtenerDatosAriel(this.requestAriel).subscribe({
      error: (error) => {
        console.log(error);
        this.ui.presentToast('Error al cargar datos');
        this.isLoading = false;
      },
      next: (response) => {
        this.dataAriel = response;
        this.verifyAsginaciones(response.items);
        this.copyListResponse = JSON.parse(
          JSON.stringify(this.listResponseAriel)
        );
      },
    });
  }

  verifyAsginaciones(data: ItemAsistencia[]) {
    this.asignacionService.verifiAsignacion(data).subscribe({
      error: (error) => {
        this.isLoading = false;
        this.ui.alertaInformativa(
          error.error || 'Error al verificar asignaciones'
        );
      },
      next: (response) => {
        this.isLoading = false;
        this.listResponseAriel = response;
        this.copyListResponseAsistencia = response;
      },
    });
  }

  submitComodin() {
    if (this.comodinForm.invalid) {
      this.ui.presentToast('Complete los campos requeridos');
      return;
    }
    this.comodinForm.patchValue({ posicion: 1, area: 'Limpieza' });
    const formValueUpdated = { ...this.comodinForm.value, isComodin: true };
    this.listResponseAriel.push(formValueUpdated);
    this.displayNewComodin = false;
    this.ui.presentToast('Asignación exitosa');
    this.comodinForm.reset();
  }

  asignar() {
    this.isLoading = true;
    let errorShown = false;
    let successShown = false;

    const handleError = (error: Error) => {
      if (!errorShown) {
        this.ui.presentToast('Error al asignar');
        errorShown = true;
        this.isLoading = false;
      }
      return of(null);
    };

    const handleSuccess = () => {
      if (!successShown) {
        this.ui.alertaInformativa('Asignación exitosa');
        successShown = true;
        this.isLoading = false;

        const horaActual = new Date().toLocaleTimeString('es', {
          hour: '2-digit',
          minute: '2-digit',
        });
        this.listResponseAriel.forEach((item) => {
          if (
            this.selectedAsignaciones.some(
              (selectedItem) => selectedItem.cod_persona === item.cod_persona
            )
          ) {
            const codigoAsignacion = `${horaActual}-${item.cod_persona}-${item.nombre_area}`;
            item.asignado = codigoAsignacion;
          }
        });
        this.selectedAsignaciones = [];
        this.copyListResponseAsistencia = this.listResponseAriel;
      }
    };

    const observables = [
      this.copyListResponse.length > 0 &&
        this.asignacionService
          .saveDatosAriel(this.copyListResponse)
          .pipe(catchError(handleError)),
      this.selectedAsignaciones.filter((item) => !item.isComodin).length > 0 &&
        this.asignacionService
          .saveAsinacionSinCambios(
            this.selectedAsignaciones.filter((item) => !item.isComodin)
          )
          .pipe(catchError(handleError)),
      this.selectedAsignaciones.filter((item) => item.isComodin).length > 0 &&
        this.asignacionService
          .saveAsignacionComodin(
            this.selectedAsignaciones.filter((item) => item.isComodin)
          )
          .pipe(catchError(handleError)),
    ].filter(Boolean);

    if (observables.length > 0) {
      forkJoin(observables).subscribe({ complete: handleSuccess });
    } else {
      handleSuccess();
    }
  }

  closeDialog() {
    this.displayNewComodin = false;
  }

  deleteAsignacion(asignacion: ItemAsistencia) {
    if (!asignacion.asignado) {
      this.ui.alertaInformativa(
        'No se puede eliminar una asignación sin asignar'
      );
      return;
    }
    this.asignacionService.deleteAsignacion(asignacion).subscribe({
      next: () => {
        this.ui.alertaInformativa('Asignación eliminada');
        this.listResponseAriel = this.listResponseAriel.map((item) => {
          if (item.cod_persona === asignacion.cod_persona) {
            item.asignado = undefined;
          }
          return item;
        });
        this.copyListResponseAsistencia = this.listResponseAriel;
      },
      error: () => {
        this.ui.presentToast('Error al eliminar asignación');
      },
    });
  }

  validarMarcacion(item: ItemAsistencia) {
    if (!this.dateFiltre) {
      this.ui.presentToast('Seleccione una fecha');
      return;
    }
    const body: IRequestAriel = {
      view: 'bi.vw_marcajes',
      fields: [],
      operators: [],
      conditions: [
        { field: 'nombre', operator: 'EQ', value: item.nombre_persona },
        { field: 'DATE(hora)', operator: 'EQ', value: this.dateFiltre },
      ],
      order: [],
    };
    this.isLoading = true;
    this.asignacionService.verifiMarcacionItemAsistencia(body, item).subscribe({
      next: (response) => {
        item.entrada = response.entrada;
        item.salida = response.salida;
        this.copyListResponseAsistencia = this.listResponseAriel;
        this.isLoading = false;
      },
      error: (error) => {
        console.log(error);
        this.ui.alertaInformativa(
          error.message || 'Error al validar marcaciones'
        );
        this.isLoading = false;
      },
    });
  }

  validarMarcaciones() {
    if (!this.selectedAsignaciones.length) {
      this.ui.presentToast('Seleccione al menos una asignación');
      return;
    }
    this.selectedAsignaciones.forEach((item) => this.validarMarcacion(item));
  }

  goHome() {
    this.navCtrl.navigateBack('/dashboard');
  }

  onInput(event: Event) {
    const input = event.target as HTMLInputElement;
    this.searchTerm.next(input.value);
  }

  filter(search: string) {
    this.listResponseAriel = search
      ? this.copyListResponseAsistencia.filter((evento) =>
          evento.cedula.includes(search)
        )
      : [...this.copyListResponseAsistencia];
  }

  msgs: Message[] = [];
  showInfoViaMessages() {
    this.msgs = [];
    this.msgs.push({
      severity: 'info',
      summary: 'Asignación',
      detail:
        'En esta página, se asignará al personal a áreas y líneas específicas usando información de Ariel.',
      icon: 'pi pi-sitemap',
    });
  }
}
