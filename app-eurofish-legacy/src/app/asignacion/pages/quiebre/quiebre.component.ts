import { Component, OnInit } from '@angular/core';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { NavController } from '@ionic/angular';
import { UiServiceService } from 'src/app/shared/services/ui-service.service';
import { QuiebreService } from '../../services/quiebre.service';
import { dataAR, Datum, IResonseTali } from '../../interfaces/tali';



@Component({
  selector: 'app-quiebre',
  templateUrl: './quiebre.component.html',
})
export class QuiebreComponent  implements OnInit {

  constructor(    private navCtrlr: NavController, private ui: UiServiceService, private quiebreService: QuiebreService) { }
  isLoading = false;


  listQuiebres: IResonseTali[] = [];

  group: any; 

  expandedRows: { [key: string]: boolean } = {};

  rangeDates: Date[] = [];



  ngOnInit() {}

  loadDataTali() {
    if (this.rangeDates.length !== 2) {
      this.ui.alertaInformativa('Selecciona un rango de fechas');
      return;
    }
    let currentDate = new Date(this.rangeDates[0]);
    const endDate = new Date(this.rangeDates[1]);
    const formattedDates = [];
    while (currentDate <= endDate) {
      const year = currentDate.getFullYear();
      const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
      const day = currentDate.getDate().toString().padStart(2, '0');
      formattedDates.push(`${year}-${month}-${day}`);
      currentDate = new Date(currentDate.setDate(currentDate.getDate() + 1));
    }
    this.isLoading = true;
    this.quiebreService.postAriel(formattedDates).subscribe(
     {
      next: (response) => {
        this.listQuiebres = response;
        console.log(this.listQuiebres);
        this.isLoading = false;
      },
      error: (error) => {
        this.ui.alertaInformativa('Error al cargar los datos');
        this.isLoading = false;
      }
     }
    );
  }

  goHome() {
    this.navCtrlr.navigateBack('/dashboard');
  }



  downloadExcel() {
    if (this.listQuiebres && this.listQuiebres.length > 0) {
      let dataForExcel: any[] = [];
      this.listQuiebres.forEach((quiebre) => {
        quiebre.data.forEach((datum) => {
          dataForExcel.push({
            prod_date: datum.prod_date,
            shift: datum.shift,
            line: datum.line,
            vessel_lot: datum.vessel_lot,
            vessel_name: datum.vessel_name,
            final_species: datum.final_species,
            final_species_size: datum.final_species_size,
            species_code: datum.species_code,
            final_control_no: datum.final_control_no,
            final_control_sprayed: datum.final_control_sprayed,
            mp_calculada: datum.mp_calculada,
            mp_calculada_perc: datum.mp_calculada_perc,
            final_trolley_count: datum.final_trolley_count,
            net_weight_crudo: datum.net_weight_crudo,
            loin_kg: datum.loin_kg,
            flake_kg: datum.flake_kg,
            other_loin_kg: datum.other_loin_kg,
            other_flake_kg: datum.other_flake_kg,
            total_loin: datum.total_loin,
            total_flake: datum.total_flake,
            relac: datum.relac,
            weight_kg_rociado: datum.weight_kg_rociado,
            weight_kg_cocido: datum.weight_kg_cocido,
            cleaning_type: datum.cleaning_type,
            piezas: datum.piezas,
            factor: datum.factor,
            exponente: datum.exponente,
            peso_prom: datum.peso_prom,
            loin_pct: datum.loin_pct,
            flake_pct: datum.flake_pct,
            rend_curva: datum.rend_curva,
            curva_pct: datum.curva_pct,
            merma_perc: datum.merma_perc,
            total_reject: datum.total_reject,
            bleach_weight: datum.bleach_weight,
            distributed_value: datum.distributed_value,
            std_loin: datum.std_loin,
            rend_kg_field: datum.rend_kg_field,
            yield_expected_lomo: datum.yield_expected_lomo,
            yield_expected_flake: datum.yield_expected_flake,
            lomo_esperado_kg: datum.lomo_esperado_kg,
            flake_esperado_kg: datum.flake_esperado_kg,
          });
        });
      });
      const worksheet = XLSX.utils.json_to_sheet([]);
      const titulo = { A: 'Historial de Quiebres' };
      const fechaCreacion = new Date();
      const fechaHoraCreacion = {
        A: `Fecha de creación: ${fechaCreacion.toLocaleDateString()} ${fechaCreacion.toLocaleTimeString()}`,
      };
      XLSX.utils.sheet_add_json(worksheet, [titulo, fechaHoraCreacion, {}], {
        origin: 'A1',
      });
      const headers = {
        prod_date: "Fecha de Producción",
        shift: "Turno",
        line: "Línea",
        vessel_lot: "Lote de Embarcación",
        vessel_name: "Nombre de Embarcación",
        final_species: "Especie Final",
        final_species_size: "Tamaño de Especie Final",
        species_code: "Código de Especie",
        final_control_no: "No. de Control Final",
        final_control_sprayed: "Control Final Rociado",
        mp_calculada: "MP Calculada",
        mp_calculada_perc: "MP Calculada %",
        final_trolley_count: "Conteo de Trolley Final",
        net_weight_crudo: "Peso Neto Crudo",
        loin_kg: "Lomo Kg",
        flake_kg: "Flake Kg",
        other_loin_kg: "Otro Lomo Kg",
        other_flake_kg: "Otro Flake Kg",
        total_loin: "Total Lomo",
        total_flake: "Total Flake",
        relac: "Relac",
        weight_kg_rociado: "Peso Kg Rociado",
        weight_kg_cocido: "Peso Kg Cocido",
        cleaning_type: "Tipo de Limpieza",
        piezas: "Piezas",
        factor: "Factor",
        exponente: "Exponente",
        peso_prom: "Peso Prom",
        loin_pct: "Lomo %",
        flake_pct: "Flake %",
        rend_curva: "Rend Curva",
        curva_pct: "Curva %",
        merma_perc: "Merma %",
        total_reject: "Total Rechazo",
        bleach_weight: "Peso de Blanqueo",
        distributed_value: "Valor Distribuido",
        std_loin: "Std Lomo",
        rend_kg_field: "Rend Kg Field",
        yield_expected_lomo: "Rend Lomo Esperado",
        yield_expected_flake: "Rend Flake Esperado",
        lomo_esperado_kg: "Lomo Esperado Kg",
        flake_esperado_kg: "Flake Esperado Kg",
      };
  
      XLSX.utils.sheet_add_json(worksheet, [headers], { skipHeader: true, origin: -1 });
      XLSX.utils.sheet_add_json(worksheet, dataForExcel, { skipHeader: true, origin: -1 });
      worksheet['!cols'] = Array(Object.keys(dataForExcel[0]).length).fill({ wch: 11 });

      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Quiebres');
      XLSX.writeFile(workbook, 'quiebres.xlsx');
    } else {
      this.ui.alertaInformativa('No hay datos para exportar');
    }
  }
  

  downloadPdfFile() {
    if (this.listQuiebres && this.listQuiebres.length > 0) {
      const doc = new jsPDF('l', 'mm', 'a4');
      const logo = '../../../../assets/demo/images/logo/logo-blue.png';
      const logoWidth = 40;
      const logoHeight = 50;
      const pageWidth = doc.internal.pageSize.width;
      const pageHeight = doc.internal.pageSize.height;
  
      doc.addImage(logo, 'JPEG', pageWidth - 15 - logoWidth, 5, logoWidth, logoHeight);
  
      const inicioY = 50;
  
      doc.setFontSize(14);
      doc.text('EUROFISH S.A', 20, 20);
  
      doc.setFontSize(10);
      doc.text('Manabi, Ecuador.', 20, 26);
      doc.text('+593 52 578 730', 20, 32);
      doc.text('info@eurofish.com.ec', 20, 38);
      doc.text('https://www.eurofish.com.ec/', 20, 44);
      doc.setFontSize(14);
      doc.text('Informe de Quiebres', pageWidth / 2, inicioY, { align: 'center' });
      let startY = inicioY + 10;
      let pageNumber = 1;
      this.listQuiebres.forEach((quiebre, index) => {
        if (index > 0) startY += 10;
        doc.text(`Fecha: ${quiebre.fecha}`, 20, startY);
        const data = quiebre.data.map(datum => [
          datum.prod_date,
          datum.shift,
          datum.line,
          datum.vessel_lot,
          datum.final_species,
          datum.species_code,
          datum.mp_calculada,
          datum.final_trolley_count,
          datum.net_weight_crudo,
          datum.loin_kg,
          datum.flake_kg,
          datum.total_loin,
          datum.total_flake,
          datum.rend_curva,
          datum.merma_perc,
          datum.total_reject,
        ]);
  
        autoTable(doc, {
          head: [['Fecha Prod.','Turno', 'Línea', 'Lote Embarc.', 'Especie Final', 'Código Esp.', 'MP Calculada', 'Trolley Count', 'Net Weight', 'Lomo Kg', 'Flake Kg', 'Total Lomo', 'Total Flake', 'Rend. Curva', 'Merma %', 'Total Rechazo']],
          body: data,
          startY: startY + 5,
          theme: 'grid',
          tableWidth: 'auto',
          styles: { fontSize: 8, cellPadding: 1, overflow: 'linebreak' },
          columnStyles: { text: { cellWidth: 'auto' } },
          didDrawPage: function (data) {
            const pageCount = doc.internal.pages.length - 1;
            const fechaActual = new Date().toLocaleDateString('es-ES', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            });
            doc.setFontSize(10);
            doc.text(`Página ${pageNumber} de ${pageCount}`, pageWidth - 30, pageHeight - 10);
            doc.text(`Fecha de creación: ${fechaActual}`, 20, pageHeight - 10);
            doc.text('Eurofish S.A', 20, pageHeight - 5);
            pageNumber++;
          }
        });
        startY = (doc as any).lastAutoTable.finalY; 
      });
  
      doc.save('quiebres.pdf');
    } else {
      this.ui.alertaInformativa('No hay datos para exportar');
    }
  }
}
