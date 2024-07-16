import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IMovimientoUltimaSemana, ITotales } from '../interfaces/dashboard';
import { environment } from 'src/environments/environment';
import { filter, map, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }

  getMovimientosUltimaSemana() {
    return this.http.get<IMovimientoUltimaSemana[]>(`${environment.urlApi}dashboard/movimientos`).pipe(
      map(response => response),
      catchError(error => { throw error })
    );
  }

  getTotales() {
    return this.http.get<ITotales[]>(`${environment.urlApi}dashboard/totales`).pipe(
      map(response => response),
      catchError(error => { throw error })
    );
  }

}
