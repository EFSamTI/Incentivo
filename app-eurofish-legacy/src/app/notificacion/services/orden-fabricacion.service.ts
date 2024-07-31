import { Injectable } from '@angular/core';
import { IOrdenFabricacion } from '../interfaces/orden-fabricacion';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IResponseEUFI, IResponseEUFIConsumos, ProductionOrderLine } from '../interfaces/eufi';

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

  getDetalleOrdenFabricacion() {
    return this.http.post<IResponseEUFI>(`${environment.urlEurofish}/api-request/bussines-one/detalle-orden-fabricacion`, null).pipe(
      map(response => response),
      catchError(error => { throw error })
    );
  }

  checkStockAvailability() {
    return this.http.post<IResponseEUFIConsumos>(`${environment.urlEurofish}api-request/bussines-one/inventory-exits`, null).pipe(
      map(response => response),
      catchError(error => { throw error })
    );
}

}
