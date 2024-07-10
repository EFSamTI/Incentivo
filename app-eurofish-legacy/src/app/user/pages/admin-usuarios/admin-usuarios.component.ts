import { Component } from '@angular/core';
import { Subject, debounceTime } from 'rxjs';
import { Usuario } from '../../../auth/interfaces/usuario';

import { MessageService } from 'primeng/api';
import { UsuarioService } from '../../services/usuario.service';
import { IUsers } from '../../interfaces/user';
import { NavController } from '@ionic/angular';
import { UiServiceService } from 'src/app/shared/services/ui-service.service';

@Component({
  selector: 'app-admin-usuarios',
  templateUrl: './admin-usuarios.component.html'
})
export class AdminUsuariosComponent {

  listUsers: IUsers[] = [];
  allUsers: IUsers[] = [];
  isLoading = false;
  searchTerm = new Subject<string>();
  roles = [{ id: 1, name: 'Administrador' },{ id: 2, name: 'Usuario' },];
  
  selectedUser?: IUsers;
  displayForm: boolean = false;
  constructor(
    private usuarioService: UsuarioService,
    private uiService: UiServiceService,
    private navCtrl: NavController,
  ) {}
  ngOnInit() {
    this.loadUsuarios();
    this.searchTerm.pipe(
      debounceTime(300)
    ).subscribe(search => this.filter(search));
  }


  formUser(user?: IUsers) {
    if (!user) {
      this.displayForm = true;
    } else {
      this.selectedUser = user;
      this.displayForm = true;
    }
  }
  saveUser(){
    this.loadUsuarios();
  }

  loadUsuarios() {
    this.isLoading = true;
    this.usuarioService.getUsuarios().subscribe(
      {
        next: (usuarios) => {
          this.listUsers = usuarios;
          this.allUsers = usuarios;
        },
        error: (error) => {
          this.uiService.alertaInformativa(error.error);
          this.isLoading = false
        },
        complete: () => this.isLoading = false,
      }
    );
  }

  deleteUser(user: Usuario) {
    this.isLoading = true;
    this.usuarioService.deleteUsuario(user.userId).subscribe({
      next: () => {
        this.uiService.presentToast('User deleted successfully');
      },
      error: (error) => {
        this.isLoading = false;
        this.uiService.alertaInformativa(error.error || error.message);
        this.loadUsuarios();
      },
      complete: () => {
        this.loadUsuarios();
        this.isLoading = false;
      }
    });
  }
  onInput(event: Event) {
    const input = event.target as HTMLInputElement;
    this.searchTerm.next(input.value);
  }

  filter(search: string) {
    if (!search) {
      this.listUsers = [...this.allUsers];
    } else {
      this.listUsers = this.allUsers.filter(evento => evento.username.includes(search));
    }
  }
}
