import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MenuItem } from 'primeng/api';
import { of, catchError, forkJoin } from 'rxjs';
import { UiServiceService } from 'src/app/shared/services/ui-service.service';
import { cargos, tunos, lineas, IItemAriel, Condition, IRequestAriel, IResponseArieL } from '../../interfaces/ariel';
import { AsignacionService } from '../../services/asignacion.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-asignacion-v2',
  templateUrl: './asignacion-v2.component.html'
})
export class AsignacionV2Component  implements OnInit {

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

  tunos: string[] = tunos;
  selectTurno?: string;

  ngOnInit() {
    this.cargos = cargos;
    this.lineas = lineas;
  }

  dateFiltre?: string;
  displayNewComodin = false;

  listResponseAriel: IItemAriel[] = [];

  selectedAsignaciones: IItemAriel[] = [];
  copyListResponse: IItemAriel[] = [];

  requestAriel?: IRequestAriel;
   dataAriel?: IResponseArieL;
  loadData() {
    let conditiosnsAriel: Condition[] = [];

    conditiosnsAriel.push({
      field: 'nombre_area',
      operator: 'EQ',
      value: 'PROCESO',
    });

    if (this.selectTurno) {
      conditiosnsAriel.push({
        field: 'turno',
        operator: 'EQ',
        value: this.selectTurno,
      });
    }
    if (this.dateFiltre) {
      conditiosnsAriel.push({
        field: 'fecha',
        operator: 'EQ',
        value: this.dateFiltre,
      });
    }
    this.requestAriel = {
      view: 'bi.vw_asistencia_planificada',
      fields: [],
      operators: [],
      conditions: conditiosnsAriel,
      order: [
        {
          field: 'nombre_persona',
          order: 'DESC',
          option: 'LAST'
        },
        {
          field: 'cedula',
        },
      ],

    };
    this.isLoading = true;
    this.asignacionService.obtenerDatosAriel(this.requestAriel).subscribe({
      error: (error) => {
        console.log(error);
        this.ui.presentToast('Error al cargar datos');
      },
      next: (response) => {
        this.dataAriel = response;
      },
    });

    if (!this.dataAriel) {
      this.ui.presentToast('No hay datos para mostrar');
      this.isLoading = false;
      return;
    }
    this.verifyAsginaciones(this.dataAriel.items);

    this.copyListResponse = JSON.parse(JSON.stringify(this.listResponseAriel));

  }

  verifyAsginaciones(data: IItemAriel[]) {
    this.asignacionService.verifiAsignacion(data as IItemAriel[]).subscribe({
      error: (error) => {
        this.isLoading = false;
        this.ui.alertaInformativa(error.error || 'Error al verificar asignaciones');
      },
      next: (response) => {
        this.isLoading = false;
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
  // {
  
  //   "bodyMarcacion": { 
  //         "view": "bi.vw_marcajes",
  //         "fields": [],
  //         "operators": [],
  //         "conditions": [
  //              {
  //                 "field": "DATE(hora)",
  //                 "operator": "EQ",
  //                 "value": "2024-07-24"
  //             },
  //             {
  //                 "field": "nombre",
  //                 "operator": "EQ",
  //                 "value": "BRIONES MERO HUGO RICARDO"
  //             },
  //              {
  //                 "field": "tipo_marcaje",
  //                 "operator": "EQ",
  //                 "value": "I"
  //             }
  //         ],
  //         "order": []
  //     }
  // }

  // export interface IItemAriel {
  //   cod_area: string;
  //   id_linea: null | number;
  //   cod_persona: string;
  //   cedula: string;
  //   turno: string;
  //   linea: null | string;
  //   actividad: null | string;
  //   horas: number;
  //   cod_jefatura: string;
  //   area_persona: string;
  //   cargo: string;
  //   cod_area_persona: string;
  //   id_cargo: number;
  //   proceso: null | string;
  //   hora_entrada: string;
  //   nombre_persona: string;
  //   tipo_gasto: string;
  //   num_empresa: number;
  //   cod_gerencia: string;
  //   id_turno: number;
  //   id_proceso: null | number;
  //   fecha: string;
  //   hora_salida: string;
  //   nombre_area: string;
  //   nombre_gerencia: string;
  //   id_actividad: null | number;
  //   nombre_jefatura: string;
  //   asignado?: string
  //   isComodin?: boolean;
  //   itemMarcacion?: ItemMarcacion;
  // }
  
  
  
  validarMarcacion( item: IItemAriel) {
    if (!this.dateFiltre) {
      this.ui.presentToast('Seleccione una fecha');
      return
    }
    const body:IRequestAriel = {
      view: 'bi.vw_marcajes',
      fields: [],
      operators: [],
      conditions: [
        
        {
          field: 'nombre',
          operator: 'EQ',
          value: item.nombre_persona,
        },
        {
          field: 'DATE(hora)',
          operator: 'EQ',
          value: this.dateFiltre,
        },
        {
          field: 'tipo_marcaje',
          operator: 'EQ',
          value: 'I',
        },
      ],
      order: [],
    };
    this.asignacionService.verifiMarcacionItemAsistencia(body).subscribe({
      next: (response) => {
        console.log(response);
        if (response.items.length > 0) {
          this.listResponseAriel = this.listResponseAriel.map((itemAriel) => {
            if (itemAriel.cod_persona === item.cod_persona) {
              itemAriel.itemMarcacion = response.items[0];
            }
            return itemAriel; 
          });
          console.log(this.listResponseAriel);
        } else {
          this.ui.alertaInformativa('No se encontraron marcaciones de llegada');
        }
      },
      error: (error) => {
        this.ui.alertaInformativa(error.error || 'Error al validar marcaciones');
      },
    });

  }
  validarMarcaciones(){

  }
  goHome() {
    this.navCtrl.navigateBack('/dashboard');
  }
}
