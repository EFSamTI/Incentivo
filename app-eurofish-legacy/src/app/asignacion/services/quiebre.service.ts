import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IResonseTali } from '../interfaces/tali';
import { environment } from 'src/environments/environment';
import { map, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuiebreService {

  constructor(private http: HttpClient) { }
  postAriel(fechas: string[]) {
    return this.http.post<IResonseTali[]>(`${environment.urlApi}api-request/tali`,
      {
        data: fechas
      }
    ).pipe(
      map(response => response),
      catchError(error => { throw error })
    );
  }
}
