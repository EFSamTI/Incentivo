import { Component, OnInit } from '@angular/core';
import { UiServiceService } from 'src/app/shared/services/ui-service.service';

import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { ILinea } from 'src/app/asignacion/interfaces/linea';
import { LineaService } from 'src/app/asignacion/services/linea.service';
import { IHistoryMovimiento, IFilterCambios } from '../../interfaces/movimiento';
import { MovimientoService } from '../../services/movimiento.service';
import { NavController } from '@ionic/angular';
import { tunos } from 'src/app/asignacion/interfaces/ariel';
import { Message } from 'primeng/api';
@Component({
  selector: 'app-historial-movimiento',
  templateUrl: './historial-movimiento.component.html',
})
export class HistorialMovimientoComponent implements OnInit {
  isLoadinMovimientos = false;
  isLoading: boolean = false;
  listCambios: IHistoryMovimiento[] = [];
  copyMovimientos: IHistoryMovimiento[] = [];
  selectMovimientos: IHistoryMovimiento[] = [];

  turnos = tunos;
  selectTurno?: string;

  filterFecha?: string;

  lineas: ILinea[] = [];
  selectLinea?: ILinea;

  constructor(
    private movimientoService: MovimientoService,
    private ui: UiServiceService,
    private lineaService: LineaService,
    private navCtrlr: NavController
  ) {}

  ngOnInit() {
    this.loadLineas();
    this.showInfoViaMessages();
  }

  filter: IFilterCambios = {};


  loadLineas() {
    this.isLoading = true;
    this.lineaService.getLinea().subscribe({
      next: (response) => {
        this.lineas = response;
        this.isLoading = false;
      },
      error: () => {
        this.ui.alertaInformativa('Error al cargar lineas');
        this.isLoading = false;
      },
    });
  }


  loadMovimientos() {

    if (this.selectLinea) {
      this.filter.linea = this.selectLinea.nombrelinea;
    }

    if (this.selectTurno) {
      this.filter.turno = this.selectTurno;
    }

    this.isLoadinMovimientos = true;
    this.movimientoService.getMovimientos(this.filter).subscribe({
      next: (response) => {
        this.listCambios = response;
        this.copyMovimientos = response;
        this.isLoadinMovimientos = false;
      },
      error: (error) => {
        this.ui.alertaInformativa(error.error || error.message);
        this.listCambios = [];
        this.isLoadinMovimientos = false;
      },
    });
  }


  downloadExcelFile() {
    if (this.listCambios && this.listCambios.length > 0) {
      const dataForExcel = this.listCambios.map((mov) => {
        const fechaHora = new Date(mov.created_at);
        const horas = fechaHora.getHours().toString().padStart(2, '0');
        const minutos = fechaHora.getMinutes().toString().padStart(2, '0');
        const horaFormateada = `${horas}:${minutos}`;

        return {
          Empleado: mov.empleado_nombre,
          CI: mov.ci,
          'Actividad previo': mov.actividad_original,
          'Área previo': mov.area_original,
          'Actividad actual': mov.actividad_cambio,
          'Área actual': mov.area_cambio,
          Hora: horaFormateada,
        };
      });
      const worksheet = XLSX.utils.json_to_sheet([], { skipHeader: true });
      const titulo = { A: 'Historial de Rotación de Personal' };
      const fechaCreacion = new Date();
      const fechaHoraCreacion = {
        A: `Fecha de creación: ${fechaCreacion.toLocaleDateString()} ${fechaCreacion.toLocaleTimeString()}`,
      };
      XLSX.utils.sheet_add_json(worksheet, [titulo, fechaHoraCreacion, {}], {
        origin: 'A1',
      });
      XLSX.utils.sheet_add_json(worksheet, dataForExcel, { origin: -1 });
      worksheet['!cols'] = [
        { wch: 20 },
        { wch: 10 },
        { wch: 15 },
        { wch: 15 },
        { wch: 15 },
        { wch: 15 },
        { wch: 10 },
      ];

      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(
        workbook,
        worksheet,
        'Historial Rotación Personal'
      );
      XLSX.writeFile(workbook, 'historial-rotacion-personal.xlsx');
    } else {
      this.ui.alertaInformativa('No hay datos para exportar');
    }
  }
  downloadPdfFile() {
    if (this.listCambios && this.listCambios.length > 0) {
      const doc = new jsPDF();

      const logo = '../../../../assets/demo/images/logo/logo-blue.png';
      doc.addImage(logo, 'JPEG', 15, 0, 40, 50);

      const inicioY = 10;
      const inicioX = 150;

      doc.setFontSize(14);
      doc.text('EUROFISH S.A', inicioX, inicioY);

      doc.setFontSize(10);
      doc.text('Manabi, Ecuador.', inicioX, inicioY + 6);

      doc.setFontSize(10);
      doc.text('+593 52 578 730', inicioX, inicioY + 12);
      doc.text('info@eurofish.com.ec', inicioX, inicioY + 18);
      doc.text('https://www.eurofish.com.ec/', inicioX, inicioY + 24);


      doc.setFontSize(14);
      doc.text('Informe de Rotación de Personal', 105, inicioY + 40, {
        align: 'center',
      });

      doc.setFontSize(10);
      if (this.selectLinea) {
        const lineaSeleccionada = this.selectLinea.nombrelinea;
        doc.text(`Linea: ${lineaSeleccionada}`, 105, inicioY + 45, { align: 'center' })
      }
      if (this.selectTurno) {
        doc.text(`Turno: ${this.selectTurno}`, 105, inicioY + 50, { align: 'center' });
      }

      doc.setFontSize(10);
      doc.text(
        'Este documento muestra el historial de rotación de personal.',
        20,
        inicioY + 55
      );

      const columnNames = [
        'Empleado',
        'CI',
        'Cargo previo',
        'Area previo',
        'Cargo',
        'Area',
        'Hora',
      ];
      const data = this.listCambios.map((mov) => [
        mov.empleado_nombre,
        mov.ci,
        mov.actividad_original,
        mov.area_original,
        mov.actividad_cambio,
        mov.area_cambio,
        this.transformarHora(mov.created_at),
      ]);
      autoTable(doc, {
        head: [columnNames],
        body: data,
        startY: inicioY + 60,
      });
      const pageCount = doc.internal.pages.length - 1;
      const fechaActual = new Date().toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.text(`Fecha de creación: ${fechaActual}`, 20, 285); 
        doc.text('Eurofish S.A', 20, 290);
        doc.text(`Página ${i} de ${pageCount}`, 170, 285);
      }
      doc.save('historial-rotacion-personal.pdf');
    } else {
      this.ui.alertaInformativa('No hay datos para exportar');
    }
  }
  transformarHora(hora: string) {
    let horaTransformada = '';
    const horaSplit = hora.split(':');
    const horaNumber = parseInt(horaSplit[0], 10);
    const minutos = horaSplit[1];
    if (horaNumber < 12) {
      horaTransformada = `${horaNumber}:${minutos} AM`;
    } else {
      horaTransformada = `${horaNumber}:${minutos} PM`;
    }
    return horaTransformada;
  }

  goHome() {
    this.navCtrlr.navigateBack('/dashboard');
  }

  showPersonalRotation() {
    this.navCtrlr.navigateBack('/movimiento');
  }

  msgs: Message[] = [];
  showInfoViaMessages() {
    this.msgs = [];
    this.msgs.push({
      severity: 'info',
      summary: 'Reporte de rotaciones realizadas',
      detail:
        'Descargue informes de rotación de personal en Excel o PDF. Filtre por persona, área o fecha.',
      icon: 'pi pi-file', 
    });
  }
}
