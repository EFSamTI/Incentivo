import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { NavController } from '@ionic/angular';

import { UserLogin } from '../../interfaces/usuario';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login-page',
  templateUrl: 'login-page.component.html',
})
export class LoginPageComponent {
  isLoading = false;
  loginForm = this.fb.group({
    email: ['', [Validators.required]],
    password: ['', Validators.required]
  })

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private navCtrl: NavController,
    private msgService: MessageService
  ) { }

  get email() {
    return this.loginForm.controls['email'];
  }
  get password() { return this.loginForm.controls['password']; }

  loginUser() {

    this.isLoading = true;
    let { email, password } = this.loginForm.value;
    const userLogin: UserLogin = { usuario: email!, password: password! };
    this.authService.loginUser(userLogin).subscribe(
      {
        error: error => {
          if (error.status === 0) {
            this.msgService.add({ severity: 'error', summary: 'Error de Conexión', detail: 'No se pudo conectar al servidor. Por favor, intente de nuevo más tarde.' });
          } else  {
            this.msgService.add({ severity: 'error', summary: 'Error', detail: error.error });
          } 
          this.isLoading = false;
        },
        complete: () => {
          this.loginForm.reset();
          this.isLoading = false;
          this.navCtrl.navigateForward('/dashboard', { replaceUrl: true });
        }
      }
    );
   
  }
}
