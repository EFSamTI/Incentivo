import { Component, OnInit } from '@angular/core';
import { IMovimientoUltimaSemana, IParadasPorArea, ITotales } from '../../interfaces/dashboard';
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

  charDataParadas: any;
    chartOptionsParadas: any;

  totales?:ITotales;

  paradas:IParadasPorArea[] = [];
  ngOnInit() {
    this.initChart();
    this.loadTotales();
    this.loadMovimientosLastWeek();
    this.loadParadasArea();
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


  loadParadasArea() {
    this.dashboardService.getParadasUltimoMes().subscribe(response => {
        this.paradas = response;
        this.initChartParadas();
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

initChartParadas() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const labels = this.paradas.map(parada => parada.nombre_area);
    const data = this.paradas.map(parada => Number(parada.total_paradas));

    const colors = ['#FF6384', '#36A2EB', '#FFCE56', '#cc65fe', '#445ce2', '#e244b1', '#0c9', '#f67019', '#4bc0c0'];
    const backgroundColors = labels.map((_, index) => colors[index % colors.length]);

    this.charDataParadas = {
        labels: labels,
        datasets: [
            {
                label: 'Total Paradas',
                data: data,
                fill: false,
                backgroundColor: backgroundColors, 
                borderColor: backgroundColors, 
                tension: .4
            }
        ]
    };
    this.chartOptionsParadas = {
        plugins: {
            legend: {
                labels: {
                    color: textColor
                }
            }
        },
        aspectRatio: 2, 
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

goMantenimientoParadas() {
    this.navCtrlr.navigateBack('/parada/mantenimiento');
}
}
