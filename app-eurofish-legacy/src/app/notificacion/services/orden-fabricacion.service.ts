import { Injectable } from '@angular/core';
import { IOrdenFabricacion } from '../interfaces/orden-fabricacion';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrdenFabricacionService {

  constructor(private http: HttpClient) { }
  createOrdenFabricacion(data: IOrdenFabricacion) {
    return this.http.post(`${environment.urlApi}orden-fabricacion`, {
      data: data
    }).pipe(
      map(response => response),
      catchError(error => { throw error })
    );
  }

}
