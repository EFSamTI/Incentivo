import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ILinea } from '../interfaces/linea';
import { environment } from 'src/environments/environment';
import { map, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LineaService {

  constructor(private http: HttpClient) { }
  

  getLinea() {
    return this.http.get<ILinea[]>(`${environment.urlApi}lineas`).pipe(
      map(response => response),
      catchError(error => { throw error })
    );
  }
}
