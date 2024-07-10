import { Component, OnInit } from '@angular/core';
import { IDataWithTurnoAndFecha, IResTali, exampleDataTali } from '../../interfaces/tali';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-quiebre',
  templateUrl: './quiebre.component.html',
})
export class QuiebreComponent  implements OnInit {

  constructor(    private navCtrlr: NavController) { }
  isLoading = false;

  data: IDataWithTurnoAndFecha[] = exampleDataTali;
  listQuiebres: IResTali[] = [];
  selectQuiebres: IResTali[] = [];

  turnos = [1, 2, 3];
  selectTurno?: number;
  fecha?: string;

  ngOnInit() {}

  loadDataTali() {
    let data = this.data.filter((item) => {
      const filterByTurno = this.selectTurno ? item.turno === this.selectTurno : true;
      const filterByDate = this.fecha ? item.fecha === this.fecha : true;
      return filterByTurno && filterByDate;
    });

    this.listQuiebres = data.reduce<IResTali[]>((acc, item) => {
      const enrichedData = item.data.map(dataItem => ({
        ...dataItem,
        linea: item.linea,
        turno: item.turno,
      }));
      acc.push(...enrichedData);
      return acc;
    }, []);

    console.log(this.listQuiebres);
  }

  goHome() {
    this.navCtrlr.navigateBack('/dashboard');
  }

}
