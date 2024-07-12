import { Component, ElementRef, ViewChild } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { LayoutService } from '../../services/app.layout.service';
import { AuthService } from '../../../auth/services/auth.service';
import { NavController } from '@ionic/angular';
import { UsuarioService } from '../../../user/services/usuario.service';
import { IUserImage } from '../../interfaces/user-roles';

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html'
})
export class HeaderComponent {
  items!: MenuItem[];
  isLoading = true;
  foto?: File;
  fotoUrl?: string;
  @ViewChild('menubutton') menuButton!: ElementRef;

  @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

  @ViewChild('topbarmenu') menu!: ElementRef;

  constructor(public layoutService: LayoutService, private authService: AuthService, private nvt: NavController, private usuarioService:UsuarioService ) { }
  onLogout() {
    this.authService.logout();
  }

  user?: IUserImage;
  getUserByToken() {
    this.isLoading = true;
    this.usuarioService.getUserFotoToken().subscribe({
      next: (user) => {
        this.user = user;
  
        if (this.user && this.user.foto) {
          this.fotoUrl = `data:image/png;base64,${this.user.foto}`; 
        }else{
          this.fotoUrl = 'assets/demo/images/avatar/default-user-foto.png';
        }
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }

  set theme(val: string) {
    this.layoutService.config.update((config) => ({
        ...config,
        theme: val,
    }));
}
get theme(): string {
    return this.layoutService.config().theme;
}

  set colorScheme(val: string) {
    this.layoutService.config.update((config) => ({
        ...config,
        colorScheme: val,
    }));
}
get colorScheme(): string {
    return this.layoutService.config().colorScheme;
}


isLightTheme: boolean = false;
changeTheme() {
  this.themeIcon = this.isLightTheme ? 'pi pi-fw pi-sun' : 'pi pi-fw pi-moon';

  if (this.isLightTheme) {
    this.theme = 'lara-dark-blue'; 
    this.colorScheme = 'dark';
    this.isLightTheme = false;
  } else {
    this.theme = 'lara-light-blue';
    this.colorScheme = 'light';
    this.isLightTheme = true;
  }
  this.updateMenuItems();
}
themeIcon?: string;
  convertirBufferABase64(buffer: any): string {
    const bytes = new Uint8Array(buffer.data);
    let binary = '';
    bytes.forEach((b) => binary += String.fromCharCode(b));
    return `data:image/jpeg;base64,${window.btoa(binary)}`;
  }

  ngOnDestroy() {
    if (this.fotoUrl) {
      URL.revokeObjectURL(this.fotoUrl);
    }
  }
  items2: MenuItem[] = [];

    ngOnInit() {
      this.themeIcon = this.isLightTheme ? 'pi pi-fw pi-moon' : 'pi pi-fw pi-sun';
      if (this.authService.currentUserLoginOn.value){
        
        this.getUserByToken();
       
      }
 
      this.updateMenuItems();    
    }

    updateMenuItems() {
      this.items2 = [
        {
          label: 'Perfil',
          icon: 'pi pi-fw pi-user',
          command: () => {
            this.nvt.navigateForward('perfil');
          }
        },
        {
          label: 'Cambiar tema',
          icon: this.themeIcon,
          command: () => {
            this.changeTheme();
          }
        },
        {
          label: 'Cerrar sesión',
          icon: 'pi pi-fw pi-sign-out',
          command: () => {
            this.onLogout();
          }
        }
      ];
    }
}

