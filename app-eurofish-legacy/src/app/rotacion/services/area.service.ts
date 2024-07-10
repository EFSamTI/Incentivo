import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IArea } from '../interfaces/area';
import { environment } from 'src/environments/environment';
import { map, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AreaService {
  constructor(private http: HttpClient) { }

  getAreas() {
    return this.http.get<IArea[]>(`${environment.urlApi}areas`).pipe(
      map(response => response),
      catchError(error => { throw error })
    );
  }

}
