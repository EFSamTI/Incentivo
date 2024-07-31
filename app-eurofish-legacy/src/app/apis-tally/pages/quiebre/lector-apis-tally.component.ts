import { DowloadPdfService } from './../../services/dowload-pdf.service';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { UiServiceService } from 'src/app/shared/services/ui-service.service';
import { QuiebreService } from '../../services/quiebre.service';
import { IApiTally } from '../../interfaces/apis-tally';
import { DowloadExcelService } from '../../services/dowload-excel.service';
import { Message } from 'primeng/api';


@Component({
  selector: 'app-quiebre',
  templateUrl: './lector-apis-tally.component.html',
})
export class LectorApisTallyComponent  implements OnInit {

  constructor(    
    private navCtrlr: NavController, 
    private ui: UiServiceService, 
    private quiebreService: QuiebreService,
    private dowloadExcelService: DowloadExcelService,
    private dowloadPdfService: DowloadPdfService
  ) { }
  isLoading = false;


  listAny: any[] = [];

  lisApisTally: IApiTally[] = [];
  selectApisTally?: IApiTally;

  group: any; 

  expandedRows: { [key: string]: boolean } = {};

  rangeDates: Date[] = [];



  ngOnInit() {
    this.loadApisTally();
    this.showInfoViaMessages();
  }


  loadApisTally() {
    this.quiebreService.getApisTally().subscribe({
      next: (response) => {
        this.lisApisTally = response;
      },
      error: (error) => {
        this.ui.alertaInformativa('Error al cargar los datos');
      }
    });
  }

  columns: any[] = [];
  loadDataTali() {
    if (this.rangeDates[0] === null || this.rangeDates[1] === null) {
      this.ui.alertaInformativa('Por favor, selecciona un rango de fechas completo.');
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
    this.quiebreService.postAriel(formattedDates, this.selectApisTally!).subscribe({
      next: (response:any) => {
        console.log(response);
        this.listAny = response;
        this.isLoading = false;
        if (this.listAny && this.listAny.length > 0) {
          const firstItem = this.listAny[0];
          const propertyNames = Object.keys(firstItem);
          this.columns = propertyNames.map(propName => {
            return { field: propName };
          });
        }
      },
      error: (error) => {
        this.ui.alertaInformativa(error.message || error.error || 'Error al cargar los datos');
        this.isLoading = false;
      }
    });

 
  }

  goHome() {
    this.navCtrlr.navigateBack('/dashboard');
  }
  downloadExcel() {
    if (!this.selectApisTally || !this.listAny) {
      this.ui.alertaInformativa('No hay datos para exportar');
      return;
    }
    const columnHeaders = this.columns.reduce((acc, column) => {
      acc[column.field] = column.field; 
      return acc;
    }, {});
  
    this.dowloadExcelService.downloadExcel(this.listAny, columnHeaders, this.selectApisTally.nombre);
  }
  

  downloadPdfFile() {

    if (!this.selectApisTally || !this.listAny) {
      this.ui.alertaInformativa('No hay datos para exportar');
      return;
    }

    const headers = this.columns.map(column => column.field);
    const columnKeys = this.columns.map(column => column.field);
    this.dowloadPdfService.downloadPdfFile(this.selectApisTally.nombre, headers, this.listAny, columnKeys);
  }

  msgs: Message[] = [];
  showInfoViaMessages() {
    this.msgs = [];
    this.msgs.push({
      severity: 'info',
      summary: 'Lector de APIs Tally ',
      detail:
        '      Descargue reportes de Tally en Excel o PDF. Filtre por API, rango de fechas para obtener la información precisa.',
      icon: 'pi pi-download',
    });
  }
}
