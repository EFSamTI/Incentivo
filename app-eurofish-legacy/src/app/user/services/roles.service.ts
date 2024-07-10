import { Injectable } from '@angular/core';
import { IResponseRole, IRoleAndOptions, Role } from '../interfaces/rol';
import { environment } from 'src/environments/environment';
import { map, catchError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IOption, IOptions } from '../interfaces/options';

@Injectable({ providedIn: 'root' })
export class RolService {
  constructor(private http: HttpClient) {}


  getOptions() {
    return this.http.get<IOptions[]>(`${environment.urlApi}options`).pipe(
      map((response) => response),
      catchError((error) => {
        throw error;
      })
    );
  }

  getRoles() {
    return this.http.get<IRoleAndOptions[]>(`${environment.urlApi}roles`).pipe(
      map((response) => response),
      catchError((error) => {
        throw error;
      })
    );
  }

  registerRole(data: Role) {
    return this.http
      .post<IResponseRole>(`${environment.urlApi}role`, {
        role: data,
      })
      .pipe(
        map((response) => response),
        catchError((error) => {
          throw error;
        })
      );
  }

  updateRole(data: Role, id: number) {
    return this.http
      .put<IResponseRole>(`${environment.urlApi}role/update`, {
        id: id,
        role: data,
      })
      .pipe(
        map((response) => response),
        catchError((error) => {
          throw error;
        })
      );
  }

  deleteRole(id: number) {
    return this.http
      .post(`${environment.urlApi}role/delete`, { id: id }, { responseType: 'text' })
      .pipe(
        map(response => response), 
        catchError((error) => {
          throw error;
        })
      );
  }

  newOption(option: IOption) {
    return this.http.post<IOptions>(`${environment.urlApi}new/option`, {
      option: option,
    }).pipe(
      map(response => response),
      catchError(error => { throw error })
    );
  }
}
