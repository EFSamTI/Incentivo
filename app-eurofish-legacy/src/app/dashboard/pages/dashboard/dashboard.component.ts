import { Component, OnInit } from '@angular/core';
import { IMovimientoUltimaSemana, ITotales } from '../../interfaces/dashboard';
import { DashboardService } from '../../services/dashboard.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent  implements OnInit {

  constructor(
    private dashboardService: DashboardService,
    private navCtrlr: NavController
  ) { }
  chartData: any;
  chartOptions: any;

  areas:string[] = ['Proceso', 'Almacen', 'Despacho', 'Mantenimiento', 'Oficina'];
  selectArea?:string;
  totales?:ITotales;
  ngOnInit() {
    this.initChart();
    this.loadTotales();
    this.loadMovimientosLastWeek();
  }

  totalAsignaciones?: number;
  loadTotales() {
    this.dashboardService.getTotales().subscribe(response => {
      this.totales = response[0];
      this.totalAsignaciones = parseInt(this.totales.total_asignaciones_normal ?? "0") + parseInt(this.totales.total_asignaciones_comodin ?? "0");    });
  }

  movimientosUltimaSemana: IMovimientoUltimaSemana[] = [];
  loadMovimientosLastWeek() {
    this.dashboardService.getMovimientosUltimaSemana().subscribe(response => {
        this.movimientosUltimaSemana = response;
        this.initChart(); 
    });
  }




  initChart() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    const diasDeLaSemana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

    const labels = this.movimientosUltimaSemana.map(movimiento => {
        const fecha = new Date(movimiento.fecha);
        const diaDeLaSemana = fecha.getDay();
        return diasDeLaSemana[diaDeLaSemana];
    });
    const data = this.movimientosUltimaSemana.map(movimiento => Number(movimiento.total_movimientos));

    this.chartData = {
        labels: labels,
        datasets: [
            {
                label: 'Total Movimientos',
                data: data, 
                fill: false,
                backgroundColor: documentStyle.getPropertyValue('--blue-700'),
                borderColor: documentStyle.getPropertyValue('--blue-700'),
                tension: .4
            }
        ]
    };

    this.chartOptions = {
        plugins: {
            legend: {
                labels: {
                    color: textColor
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    color: surfaceBorder,
                    drawBorder: false
                }
            },
            y: {
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    color: surfaceBorder,
                    drawBorder: false
                }
            }
        }
    };
}
convertirFechaADia(fecha: string) {
  const diasDeLaSemana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  const fechaDate = new Date(fecha);
  const diaDeLaSemana = fechaDate.getDay();
  return diasDeLaSemana[diaDeLaSemana];
}

goHistotialMovimientos() {
    this.navCtrlr.navigateBack('/movimiento/historial');
}
}
