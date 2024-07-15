import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { UiServiceService } from 'src/app/shared/services/ui-service.service';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptorService implements HttpInterceptor{
  private sessionExpiredShown = false;
  constructor(private ui:UiServiceService, private navController:NavController) { }
  
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError(error => {
        console.error(error);
        if (error.error === "SESSION_NO_VALIDAD" && !this.sessionExpiredShown) {
          this.sessionExpiredShown = true;
          this.ui.sessionExpired("Su sesión ha expirado", () => {
            this.navController.navigateRoot('/auth/login');
            this.sessionExpiredShown = false;
          });
        }
        return throwError(()=>error);
      })
    )
  }
}
