import { Component } from '@angular/core';
import { Usuario } from 'src/app/auth/interfaces/usuario';
import { UsuarioService } from '../../services/usuario.service';
import { AuthService } from '../../../auth/services/auth.service';
import { IUserRole } from 'src/app/shared/interfaces/user-roles';
import { IUserSinFoto } from '../../interfaces/user';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
})
export class HomePageComponent {
  isLoading = false;


  constructor(private UsuarioService: UsuarioService, private authService: AuthService) {}

  ngOnInit() {
    if (this.authService.currentUserLoginOn.value){
      this.getUserByToken();
    }
  }
  user?: IUserSinFoto;
 getUserByToken() {
    this.isLoading = true;
    this.UsuarioService.getUserInfo().subscribe({
      next: (user) => {
        this.user = user;
      },
      complete: () => {
        this.isLoading = false;
      },
    });
    }
  
}
