import { Injectable } from '@angular/core';
import {
  UserLogin,
  Usuario,
  UsuarioLoginResponse,
} from '../interfaces/usuario';
import { environment } from '../../../environments/environment';
import { catchError, BehaviorSubject, tap, map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular'; 

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  token?: string ;
  currentUserLoginOn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  currentUserData: BehaviorSubject<String> = new BehaviorSubject<String>('');

  private usuario?: Usuario;
  constructor(private http: HttpClient,   private navCtrl: NavController,  private storage: Storage) {
    this.init(); 
    this.currentUserLoginOn=new BehaviorSubject<boolean>(this.getToken() != null);
    //this.currentUserData=new BehaviorSubject<String>(sessionStorage.getItem("token") || "");
  }
  async init() {
    await this.storage.create();
    const token = await this.storage.get('token');
    this.token = token;
    const isLoggedIn = token != null;
    this.currentUserLoginOn.next(isLoggedIn);
    this.currentUserData.next(token || '');
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
           this.saveToken(data.token);
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
    this.storage.clear();


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

  async saveToken(token: string) {
    this.token = token;
    await this.storage.set('token', token);
  }

  async getToken() {
    if (this.token) return this.token;
    this.token = await this.storage.get('token');
    return this.token;
  }

}
