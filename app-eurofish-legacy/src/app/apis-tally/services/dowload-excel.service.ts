import { Injectable } from '@angular/core';
import { UiServiceService } from 'src/app/shared/services/ui-service.service';
import { QuiebreService } from './quiebre.service';

import * as XLSX from 'xlsx';

@Injectable({
  providedIn: 'root'
})
export class DowloadExcelService {

  constructor( private ui: UiServiceService) { }

  downloadExcel(dataList: any[], columnHeaders: { [key: string]: string }, fileName: string) {
    if (!dataList || dataList.length === 0) {
      this.ui.alertaInformativa('No hay datos para exportar');
      return;
    }
  
    const safeFileName = fileName.length > 31 ? fileName.substring(0, 31) : fileName;
  
    let dataForExcel: any[] = dataList.map(item => {
      let row: Record<string, any> = {}; 
      Object.keys(columnHeaders).forEach(key => {
        row[columnHeaders[key]] = item[key];
      });
      return row;
    });
  
    const worksheet = XLSX.utils.json_to_sheet([]);
    const titulo = { A: safeFileName };
    const fechaCreacion = new Date();
    const fechaHoraCreacion = {
      A: `Fecha de creación: ${fechaCreacion.toLocaleDateString()} ${fechaCreacion.toLocaleTimeString()}`,
    };
    XLSX.utils.sheet_add_json(worksheet, [titulo, fechaHoraCreacion, {}], { origin: 'A1' });
  
    XLSX.utils.sheet_add_json(worksheet, [columnHeaders], { skipHeader: true, origin: -1 });
    XLSX.utils.sheet_add_json(worksheet, dataForExcel, { skipHeader: true, origin: -1 });
    worksheet['!cols'] = Array(Object.keys(columnHeaders).length).fill({ wch: 20 });
  
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, safeFileName);
    XLSX.writeFile(workbook, `${safeFileName}.xlsx`);
  }
}
