import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Usuario } from '../../auth/interfaces/usuario';
import {  IUsers, IUserSinFoto, User } from '../interfaces/user';
import { IUserImage, IUserRole } from 'src/app/shared/interfaces/user-roles';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  selectUser?: Usuario;
  constructor(private http: HttpClient) { }

  get currentSelectUser(): Usuario | undefined {
    if (!this.selectUser) return undefined;
    return structuredClone(this.selectUser);
  }

  registerUsuario(data: User, userImage: File) {
    const formData = new FormData();  
    formData.append('user', JSON.stringify(data));
    formData.append('file', userImage, userImage.name);
    return this.http.post<Usuario>(`${environment.urlApi}usuario`,
      formData
    ).pipe(
      map(response => response),
      catchError(error => { throw error })
    );
  }


  updateUsuario(data: User, id: number) {
    return this.http.put<Usuario>(`${environment.urlApi}usuario/update`, {
      id: id,
      user: data
    }).pipe(
      map(response => response),
      catchError(error => { throw error })
    );
  }

  getUsuarios() {
    return this.http.get<IUsers[]>(`${environment.urlApi}usuarios`).pipe(
      catchError(error => { throw error })
    );
  }



  getUserFotoToken() {
    return this.http.get<IUserImage>(`${environment.urlApi}usuario/foto`,{}).pipe(
      map(response => response),
      catchError(error => { throw error })
    );
  }

  getUserInfo() {
    return this.http.get<IUserSinFoto>(`${environment.urlApi}usuario/info`).pipe(
      map(response => response),
      catchError(error => { throw error })
    );
  }

  deleteUsuario(id: number) {
    return this.http.post(`${environment.urlApi}usuario/delete`, {
      id: id
    }, { responseType: 'text' }).pipe(
      map(response => response),
      catchError(error => { throw error })
    );
  }
  setSelectUser(user: Usuario) {
    this.selectUser = user;
  }
  resetSelectUser() {
    this.selectUser = undefined;
  }
}

