import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { BehaviorSubject, Subject, catchError, map } from 'rxjs';
import { Usuario } from '../../auth/interfaces/usuario';
import { MenuChangeEvent } from '../api/menuchangeevent';
import { IUserRole } from '../interfaces/user-roles';
import { AuthService } from '../../auth/services/auth.service';
import { IOptions } from 'src/app/user/interfaces/options';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private menuSource = new Subject<MenuChangeEvent>();
  private resetSource = new Subject();

  constructor(private http: HttpClient, private authService: AuthService) { }

  menuSource$ = this.menuSource.asObservable();
  resetSource$ = this.resetSource.asObservable();

  onMenuStateChange(event: MenuChangeEvent) {
      this.menuSource.next(event);
  }

  reset() {
      this.resetSource.next(true);
  }

 getUsersRoles() {
  
    return this.http.get<IOptions[]>(`${environment.urlApi}roles/user`, {

    }).pipe(
      map(response => response),
      catchError(error => { throw error })
    );
  }

 
}


