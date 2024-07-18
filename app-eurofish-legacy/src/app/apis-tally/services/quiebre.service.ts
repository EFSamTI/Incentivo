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
  postAriel(fechas: string[], apiTally: IApiTally) {
    return this.http.post(`${environment.urlApi}apis/tally`,
      {
        api: apiTally,
        fechas: fechas
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
