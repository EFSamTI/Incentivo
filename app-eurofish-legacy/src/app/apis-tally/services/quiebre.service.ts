import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { map, catchError } from 'rxjs';
import { IResonseTali } from 'src/app/asignacion/interfaces/tali';
import { IApiTally } from '../interfaces/apis-tally';

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

  getApisTally() {
    return this.http.get<IApiTally[]>(`${environment.urlApi}apis/tally`).pipe(
      map(response => response),
      catchError(error => { throw error })
    );
  }
}
