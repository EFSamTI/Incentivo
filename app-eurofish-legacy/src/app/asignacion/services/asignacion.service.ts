import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IBody, IItemAriel, IResponseAriel } from '../interfaces/ariel';
import { map, catchError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AsignacionService {

  constructor(private http: HttpClient) { }


  obtenerDatosAriel(filter:IBody){
    return this.http.post<IResponseAriel>(`${environment.urlApi}api-request`, {
      body: filter
    }).pipe(
      map(response => response),
      catchError(error => { throw error })
    );
  }

  verifiAsignacion(data: IItemAriel[]) {
    return this.http.post<IItemAriel[]>(`${environment.urlApi}asignacion/verificar`, {
      data: data
    }).pipe(
      map(response => response),
      catchError(error => { throw error })
    );
  }

  saveAsignacionComodin(data: IItemAriel[]) {
    return this.http.post<IItemAriel[]>(`${environment.urlApi}asignacion/comodin`, {
      data: data
    }).pipe(
      map(response => response),
      catchError(error => { throw error })
    );
  }

  saveDatosAriel(data: IItemAriel[]) {
    return this.http.post<IItemAriel[]>(`${environment.urlApi}asignacion/ariel`, {
      data: data
    }).pipe(
      map(response => response),
      catchError(error => { throw error })
    );
  }

  saveAsinacionSinCambios(data: IItemAriel[]) {
    return this.http.post<IItemAriel[]>(`${environment.urlApi}asignacion`, {
      data: data
    }).pipe(
      map(response => response),
      catchError(error => { throw error })
    );
  }

  deleteAsignacion(data: IItemAriel) {
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
