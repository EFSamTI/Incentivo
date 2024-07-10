import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IFilterParada, IParada, IParadaUpdate, IRegisterParada } from '../interfaces/paradas';
import { environment } from 'src/environments/environment';
import { catchError, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ParadaService {

  constructor(private http: HttpClient) { }

  createParada(data: IRegisterParada) {
    return this.http.post(`${environment.urlApi}parada`, {
      data: data
    }).pipe(
      map(response => response),
      catchError(error => { throw error })
    );
  }

  getParadas(filter: IFilterParada) {
    return this.http.post<IParada[]>(`${environment.urlApi}paradas`,
      {
        data: filter
      }
    ).pipe(
      map(response => response),
      catchError(error => { throw error })
    );
  }

  actulizarParada(data: IParadaUpdate) {
    return this.http.put(`${environment.urlApi}parada`, {
      data: data
    }).pipe(
      map(response => response),
      catchError(error => { throw error })
    );
  }

  eliminarParada(id: number) {
    return this.http.put(`${environment.urlApi}parada/delete`,
      {
        data: id
      },
      {
        responseType: 'text'
      }
    ).pipe(
      map(response => response),
      catchError(error => { throw error })
    );
  }
}
