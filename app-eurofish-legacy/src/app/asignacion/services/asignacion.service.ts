import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map, catchError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IRequestAriel, IResponseAriel, IResponseEntradaAndSalida, ItemAsistencia } from '../interfaces/ariel';

@Injectable({
  providedIn: 'root'
})
export class AsignacionService {

  constructor(private http: HttpClient) { }


  obtenerDatosAriel(filter:IRequestAriel){
    return this.http.post<IResponseAriel<ItemAsistencia>>(`${environment.urlApi}api-request/ariel`, {
      body: filter
    }).pipe(
      map(response => response),
      catchError(error => { throw error })
    );
  }

  verifiAsignacion(data: ItemAsistencia[]) {
    return this.http.post<ItemAsistencia[]>(`${environment.urlApi}asignacion/verificar`, {
      data: data
    }).pipe(
      map(response => response),
      catchError(error => { throw error })
    );
  }

  verifiMarcacionItemAsistencia(data: IRequestAriel, itemAsistencia: ItemAsistencia) {
    console.log({
      bodyMarcacion: data,
      itemAsistencia: itemAsistencia
    });
    return this.http.post<IResponseEntradaAndSalida>(`${environment.urlApi}api-request/ariel/marcacion`, {
      bodyMarcacion: data,
      itemAsistencia: itemAsistencia
    }).pipe(
      map(response => response),
      catchError(error => { throw error })
    );
  }


  saveAsignacionComodin(data: ItemAsistencia[]) {
    return this.http.post<ItemAsistencia[]>(`${environment.urlApi}asignacion/comodin`, {
      data: data
    }).pipe(
      map(response => response),
      catchError(error => { throw error })
    );
  }

  saveDatosAriel(data: ItemAsistencia[]) {
    return this.http.post<ItemAsistencia[]>(`${environment.urlApi}asignacion/ariel`, {
      data: data
    }).pipe(
      map(response => response),
      catchError(error => { throw error })
    );
  }

  saveAsinacionSinCambios(data: ItemAsistencia[]) {
    return this.http.post<ItemAsistencia[]>(`${environment.urlApi}asignacion`, {
      data: data
    }).pipe(
      map(response => response),
      catchError(error => { throw error })
    );
  }

  deleteAsignacion(data: ItemAsistencia) {
    return this.http.delete(`${environment.urlApi}asignacion`, {
      body: {
        data: data
      }
    }).pipe(
      map(response => response),
      catchError(error => { throw error; })
    );
  }

}
