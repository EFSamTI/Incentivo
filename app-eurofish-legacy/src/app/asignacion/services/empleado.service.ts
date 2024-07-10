import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Empleado } from '../../rotacion/interfaces/movimiento';
import { environment } from 'src/environments/environment';
import { map, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  constructor(private http: HttpClient) { }
  

  getEmpleados() {
    return this.http.get<Empleado[]>(`${environment.urlApi}empleados`).pipe(
      map(response => response),
      catchError(error => { throw error })
    );
  }
}
