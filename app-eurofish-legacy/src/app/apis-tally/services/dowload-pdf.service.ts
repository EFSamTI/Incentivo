import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
@Injectable({
  providedIn: 'root'
})
export class DowloadPdfService {

  constructor() { }

  downloadPdfFile(title: string, headers: string[], data: any[], columnKeys: string[] = []) {
    const doc = new jsPDF('l', 'mm', 'a4');
    const pageWidth = doc.internal.pageSize.width;
    const pageHeight = doc.internal.pageSize.height;
    const logo = '../../../../assets/demo/images/logo/logo-blue.png';
    const logoWidth = 40;
    const logoHeight = 50;
  
    doc.addImage(logo, 'JPEG', pageWidth - 15 - logoWidth, 5, logoWidth, logoHeight);
    doc.setFontSize(14);
    doc.text('EUROFISH S.A', 20, 20);
    doc.setFontSize(10);
    doc.text('Manabi, Ecuador.', 20, 26);
    doc.text('+593 52 578 730', 20, 32);
    doc.text('info@eurofish.com.ec', 20, 38);
    doc.text('https://www.eurofish.com.ec/', 20, 44);
  
    doc.setFontSize(14);
    doc.text(title, pageWidth / 2, 50, { align: 'center' });
  
    let startY = 60;
    let hasMoreColumns = false;
  
    // Limitar el número de columnas a 15
    if (columnKeys.length > 15) {
      columnKeys = columnKeys.slice(0, 15);
      headers = headers.slice(0, 15);
      hasMoreColumns = true;
    } else if (headers.length > 15) {
      headers = headers.slice(0, 15);
      hasMoreColumns = true;
    }
  
    // Preparar los datos del cuerpo de la tabla
    const bodyData = data.map(item => columnKeys.length > 0 ? columnKeys.map(key => item[key]) : item);
  
    // Ajustar el cuerpo de la tabla si hay más de 15 columnas
    if (hasMoreColumns) {
      bodyData.forEach(row => {
        if (row.length > 15) {
          row.length = 15; // Limitar cada fila del cuerpo a 15 elementos
        }
      });
    }
  
    autoTable(doc, {
      head: [headers],
      body: bodyData,
      startY: startY,
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
        doc.text(`Página ${pageCount}`, pageWidth - 30, pageHeight - 10);
        doc.text(`Fecha de creación: ${fechaActual}`, 20, pageHeight - 10);
        doc.text('Eurofish S.A', 20, pageHeight - 5);
      }
    });
  
    if (hasMoreColumns) {
      doc.text("* La tabla tiene más columnas de las que se muestran aquí.", 20, doc.internal.pageSize.height - 20);
    }
  
    doc.save(`${title}.pdf`);
  }
}
