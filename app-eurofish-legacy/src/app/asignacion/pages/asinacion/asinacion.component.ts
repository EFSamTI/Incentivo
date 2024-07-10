import { Component, OnInit } from '@angular/core';

import {
  Condition,
  IBody,

  IItemAriel,

  cargos,

  itemExampleAriel,

  lineas,

  tunos,
} from '../../interfaces/ariel';
import { AsignacionService } from '../../services/asignacion.service';
import { UiServiceService } from 'src/app/shared/services/ui-service.service';
import { of, catchError, forkJoin } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MenuItem } from 'primeng/api';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-asinacion',
  templateUrl: './asinacion.component.html',
})
export class AsinacionComponent implements OnInit {
  isLoading = false;

  comodinForm: FormGroup;
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
  breadcrumbItems: MenuItem[] = [{ label: 'Asignar' }];

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

  cargos: string[] = [];
  selectCargo?: string;

  lineas: string[] = [];

  tunos: string[] = [];
  selectTurno?: string;

  ngOnInit() {
    this.cargos = cargos;
    this.tunos = tunos;
    this.lineas = lineas;
  }

  dateFiltre?: string;
  displayNewComodin = false;

  listResponseAriel: IItemAriel[] = [];

  selectedAsignaciones: IItemAriel[] = [];
  copyListResponse: IItemAriel[] = [];

  requestAriel?: IBody;

  loadData() {
    let conditiosnsAriel: Condition[] = [];
    // if (this.selectCargo) {
    //   conditiosnsAriel.push({
    //     field: 'cargo',
    //     operator: 'EQ',
    //     value: this.selectCargo,
    //   });
    // }
    // if (this.selectTurno) {
    //   conditiosnsAriel.push({
    //     field: 'turno',
    //     operator: 'EQ',
    //     value: this.selectTurno,
    //   });
    // }
    if (this.dateFiltre) {
      conditiosnsAriel.push({
        field: 'fecha_ingreso',
        operator: 'EQ',
        value: this.dateFiltre,
      });
    }

    this.requestAriel = {
      view: 'vw_nomina_mes',
      fields: [
        'codigo_persona',
        'cedula',
        'nombre',
        'cod_area',
        'area',
        'centro_costo_01',
        'codigo_centro_costo_01',
        'centro_costo_02',
        'codigo_centro_costo_02',
        'centro_costo_03',
        'codigo_centro_costo_03',
        'centro_costo_04',
        'codigo_centro_costo_04',
        'centro_costo_05',
        'codigo_centro_costo_05',
        'fecha_ingreso',
      ],
      operators: [],
      conditions: conditiosnsAriel,
      order: [
        {
          field: 'nombre',
          order: 'DESC',
          option: 'LAST',
        },
        {
          field: 'cedula',
        },
      ],
      limit: 3,
    };

    console.log(this.requestAriel);
    const data = itemExampleAriel;
    this.verifyAsginaciones(data);
    this.copyListResponse = JSON.parse(JSON.stringify(this.listResponseAriel));
  }

  verifyAsginaciones(data: IItemAriel[]) {
    this.asignacionService.verifiAsignacion(data as IItemAriel[]).subscribe({
      error: (error) => {
        console.log(error);
      },
      next: (response) => {
        this.listResponseAriel = response;
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
    this.listResponseAriel.push({ ...formValueUpdated });
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
      }
    };
    const observables = [];

    if (this.copyListResponse.length > 0) {
      observables.push(
        this.asignacionService
          .saveDatosAriel(this.copyListResponse)
          .pipe(catchError(handleError))
      );
    }
    const comodines = this.selectedAsignaciones.filter(
      (item) => item.isComodin === true
    );
    const noComodines = this.selectedAsignaciones.filter(
      (item) => item.isComodin !== true
    );

    if (noComodines.length > 0) {
      observables.push(
        this.asignacionService
          .saveAsinacionSinCambios(noComodines)
          .pipe(catchError(handleError))
      );
    }

    if (comodines.length > 0) {
      observables.push(
        this.asignacionService
          .saveAsignacionComodin(comodines)
          .pipe(catchError(handleError))
      );
    }

    if (observables.length > 0) {
      forkJoin(observables).subscribe({
        complete: handleSuccess,
      });
    } else {
      handleSuccess();
    }
  }

  closeDialog() {
    this.displayNewComodin = false;
  }

  deleteAsignacion(asignacion: IItemAriel) {
    if (!asignacion.asignado) {
      this.ui.alertaInformativa(
        'No se puede eliminar una asignación sin asignar'
      );
      return;
    }
    this.asignacionService.deleteAsignacion(asignacion).subscribe({
      next: () => {
        this.ui.alertaInformativa('Asignación eliminada');
        this.listResponseAriel = this.listResponseAriel.filter(
          (item) => item.cod_persona !== asignacion.cod_persona
        );
      },
      error: () => {
        this.ui.presentToast('Error al eliminar asignación');
      },
    });
  }
  goHome() {
    this.navCtrl.navigateBack('/dashboard');
  }
}
