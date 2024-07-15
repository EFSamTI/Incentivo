import { Injectable } from '@angular/core';
import {
  UserLogin,
  Usuario,
  UsuarioLoginResponse,
} from '../interfaces/usuario';
import { environment } from '../../../environments/environment';
import { catchError, BehaviorSubject, tap, map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular'; 

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  currentUserLoginOn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  currentUserData: BehaviorSubject<String> =new BehaviorSubject<String>("");

  private usuario?: Usuario;
  constructor(private http: HttpClient,   private navCtrl: NavController,  private storage: Storage) {
    this.currentUserLoginOn=new BehaviorSubject<boolean>(sessionStorage.getItem("token")!=null);
    this.currentUserData=new BehaviorSubject<String>(sessionStorage.getItem("token") || "");
  }
  get currentUser(): Usuario | undefined {
    if (!this.usuario) return undefined;
    return structuredClone(this.usuario);
  }
  loginUser(userDetails: UserLogin) {
    return this.http
      .post<UsuarioLoginResponse>(
        `${environment.urlHost}auth/login`,
        userDetails
      )
      .pipe(

        tap((data) => {
          sessionStorage.setItem("token", data.token);
          this.usuario = data.user;
          this.currentUserData.next(data.token);
          this.currentUserLoginOn.next(true);
        }),
        map((response) => response),
        catchError((error) => {
          throw error;
        })
      );
  }

  logout() {

    this.currentUserLoginOn.next(false);
    this.usuario = undefined;
    sessionStorage.removeItem("token");
    this.navCtrl.navigateRoot('/auth/login',{ replaceUrl: true });
  }
  get userData(): Observable<String> {
    return this.currentUserData.asObservable();
  }

  get userLoginOn(): Observable<boolean> {
    return this.currentUserLoginOn.asObservable();
  }

  get userToken(): String {
    return this.currentUserData.value;
  }
  get Usuario(): Observable<String> {
    return this.currentUserData.asObservable();
  }

}
