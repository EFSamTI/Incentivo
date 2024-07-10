import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAsignacion, IFilterAsignaciones, IFilterCambios, IHistoryMovimiento, IMovimiento } from '../interfaces/movimiento';
import { map, catchError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MovimientoService {

  constructor(private http: HttpClient) { }

  getAsignaciones(filter: IFilterAsignaciones) {
    return this.http.post<IAsignacion[]>(`${environment.urlApi}asignaciones`,
      {
        data: filter
      }
    ).pipe(
      map(response => response),
      catchError(error => { throw error })
    );
  }

  getMovimientos(filter: IFilterCambios) {
    return this.http.post<IHistoryMovimiento[]>(`${environment.urlApi}movimientos`,{
      data: filter
    }).pipe(
      map(response => response),
      catchError(error => { throw error })
    );
  }

  getUltimosMovimientos(filter: IFilterCambios) {
    return this.http.post<IMovimiento[]>(`${environment.urlApi}movimiento/ultimos`,{
      data: filter
    }).pipe(
      map(response => response),
      catchError(error => { throw error })
    );
  }

  postCambios(asignaciones: IChanges[]) {
    return this.http.post<IAsignacion[]>(`${environment.urlApi}movimiento/aplicar`, {
      data: asignaciones
    }).pipe(
      map(response => response),
      catchError(error => { throw error })
    );
  }

  postRestablecerCambios = (asignaciones: IMovimiento[]) => {
    return this.http.post(`${environment.urlApi}movimiento/restablecer`, {
      data: asignaciones
    }).pipe(
      map(response => response),
      catchError(error => { throw error })
    );
  }

  
}
export interface IChanges {
  asignacionid: number;
  area: string;
  cargo: string;
}
