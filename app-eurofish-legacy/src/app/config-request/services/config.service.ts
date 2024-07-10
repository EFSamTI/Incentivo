import { Injectable } from '@angular/core';
import { IConfiRequiest, IRegisterRequest } from '../interfaces/config-response';
import { environment } from 'src/environments/environment';
import { map, catchError } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})


export class ConfigService {
  

  constructor(private http: HttpClient) { }

  getConfigRequest() {
    return this.http.get<IConfiRequiest[]>(`${environment.urlApi}api-request`).pipe(
      map(response => response),
      catchError(error => { throw error })
    );
  }

  createConfigRequest(data: IRegisterRequest) {
    return this.http.post(`${environment.urlApi}api-request/crear`, {
      data: data
    }, { responseType: 'text' }).pipe(
      map(response => response),
      catchError(error => { throw error })
    );
  }

  updateConfigRequest(data: IRegisterRequest) {
    return this.http.put(`${environment.urlApi}api-request`, {
      data: data
    }, { responseType: 'text' })
    .pipe(
      map(response => response),
      catchError(error => { throw error })
    );
  }

  desactivarConfigRequest(id: number) {
    return this.http.put(`${environment.urlApi}api-request/desactivar`, {
      id: id
    
    }, { responseType: 'text' } ).pipe(
      map(response => response),
      catchError(error => { throw error })
    );
  }


  activarConfigRequest(id: number) {
    return this.http.put(`${environment.urlApi}api-request/activar`, {
      id: id
    
    }, { responseType: 'text' } ).pipe(
      map(response => response),
      catchError(error => { throw error })
    );
  }

  deleteConfigRequest(ids: number[]) {
    return this.http.put(`${environment.urlApi}api-request/eliminar`, {
      data: ids
    }, { responseType: 'text' }).pipe(
      map(response => response),
      catchError(error => { throw error })
    );
  }
  

}
