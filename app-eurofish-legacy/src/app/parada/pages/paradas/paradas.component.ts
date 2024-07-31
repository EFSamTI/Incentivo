import { Component, OnInit } from '@angular/core';

import { Empleado } from '../../../rotacion/interfaces/movimiento';
import { UiServiceService } from 'src/app/shared/services/ui-service.service';

import { ParadaService } from '../../../parada/services/parada.service';
import { MenuItem, Message } from 'primeng/api';
import { NavController } from '@ionic/angular';
import { IRegisterParada } from '../../../parada/interfaces/paradas';
import { ILinea } from 'src/app/asignacion/interfaces/linea';
import { EmpleadoService } from 'src/app/asignacion/services/empleado.service';
import { LineaService } from 'src/app/asignacion/services/linea.service';
import { tunos } from 'src/app/asignacion/interfaces/ariel';

@Component({
  selector: 'app-paradas',
  templateUrl: './paradas.component.html',
})
export class ParadasComponent implements OnInit {
  constructor(
    private empleadoService: EmpleadoService,
    private ui: UiServiceService,
    private lineaService: LineaService,
    private paradaService: ParadaService,
    private navCtrlr: NavController
  ) {}

  breadcrumbItems: MenuItem[] = [
    { label: 'Crear parada' },
  ];


  fecha?: string;
  hora_inicio?: string;
  hora_fin?: string;

  turnos: any[] = [];
  tipoFiltro: any[] = [];

  selectTurno?: any;
  selectTipoFiltro?: any;
  lineas: ILinea[] = [];
  selectLinea?: ILinea;

  empleados: Empleado[] = [];
  selectEmpleado?: Empleado;

  tipoParada: any[] = [];
  selectTipoParada?: any;

  ngOnInit() {
    this.showInfoViaMessages();
    this.turnos = tunos;
    this.tipoFiltro = [
      { name: 'Individual', value: 'Individual' },
      { name: 'Grupal', value: 'Grupal' },
    ];

    this.tipoParada = [
      { name: 'Parada al baño', value: 'Parada al baño' },
      { name: 'Almuerzo', value: 'Almuerzo' },
    ];

    this.loadEmpleados();
    this.loadLineas();
  }
  loadEmpleados() {
    this.empleadoService.getEmpleados().subscribe({
      next: (response) => {
        this.empleados = response;
      },
      error: () => {
        this.ui.alertaInformativa('Error al cargar empleados');
      },
    });
  }

  navigateMantenimientoParadas() {
    this.navCtrlr.navigateForward('parada/mantenimiento');
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

  onSave() {
    if (
      !this.fecha ||
      !this.hora_inicio ||
      !this.hora_fin ||
      !this.selectTurno ||
      !this.selectTipoFiltro ||
      !this.selectLinea ||
      !this.selectTipoParada
    ) {
      return this.ui.alertaInformativa('Todos los campos son obligatorios');
    }
    if (this.selectTipoFiltro === 'Grupal') {
      this.selectEmpleado = undefined;
    } else {
      if (!this.selectEmpleado) {
        return this.ui.alertaInformativa(
          'El campo empleado es obligatorio para el tipo de filtro individual'
        );
      }
    }
    const filter: IRegisterParada = {
      fecha: this.fecha,
      turno: this.selectTurno,
      linea: this.selectLinea.nombrelinea,

      tipo_parada: this.selectTipoParada.name,
      hora_inicio: this.hora_inicio,
      hora_fin: this.hora_fin,
    };
    if (this.selectEmpleado) {
      filter.colaborador = this.selectEmpleado.nombre;
    }
    console.log(filter);
    this.paradaService.createParada(filter).subscribe({
      next: () => {
        this.ui.presentToast('Guardado');
      },
      error: (error) => {
        this.ui.alertaInformativa(
          error.error || error.message || 'Error al guardar'
        );
      },
    });
    return;
  }

  cancel() {
    this.fecha = undefined;
    this.hora_inicio = undefined;
    this.hora_fin = undefined;
    this.selectTurno = undefined;
    this.selectTipoFiltro = undefined;
    this.selectLinea = undefined;
    this.selectEmpleado = undefined;
    this.selectTipoParada = undefined;
  }

  goHome() {
    this.navCtrlr.navigateBack('/dashboard');
  }
  msgs: Message[] = [];
  showInfoViaMessages() {
    this.msgs = [];
    this.msgs.push({
      severity: 'info',
      summary: 'Registro de Paradas',
      detail:
        'Registre y gestione las paradas de usuarios, incluyendo fecha, turno y área.',
      icon: 'pi pi-file',
    });
  }
}
