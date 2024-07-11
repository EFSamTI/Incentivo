import { Component } from '@angular/core';
import {  NavController } from '@ionic/angular';
import { LayoutService } from '../../services/app.layout.service';
import { MenuService } from '../../services/menu.service';
import { MenuItem } from 'primeng/api';
import { IOptions } from 'src/app/user/interfaces/options';

@Component({
  selector: 'app-slider-menu',
  templateUrl: 'slider-menu.component.html',
})
export class SliderMenuComponent {
  model: any[] = [];
  optionUsers?: IOptions[];

  userLoginOn: boolean = false;
  constructor(
    public layoutService: LayoutService,
    private menuService: MenuService,
    private navCtrl: NavController,
  ) {
  }

ngOnInit() {
   this.menuService.getUsersRoles().subscribe({
        next: (roles: IOptions[]) => {
          this.optionUsers = roles;
          this.model = this.generarMenuItems();
        },
      });
  }
  generarMenuItems(): MenuItem[] {
    let items: MenuItem[] = [
      {
        label: 'Home',
        items: [
          {
            label: 'Dashboard',
            icon: 'pi pi-home',
            command: () => this.navegar('/dashboard'),
          },
        ]
      },{
        separator: true
      },
      {
        label: 'Opciones', 
        icon: 'pi pi-fw pi-cog', 
        items: [] 
      }
    ];
    if (this.optionUsers) {
      let opcionesItem = items.find(item => item.label === 'Opciones');
    
      if (opcionesItem) {
        opcionesItem.items = opcionesItem.items || [];
        for (let option of this.optionUsers) {
          opcionesItem.items.push({
            label: option.optionName,
            icon: `pi pi-fw pi-${option.icon}`,
            command: () => this.navegar(option.path),
          });
        }
      }
    }
  
    return items;
  }
  navegar(ruta: string) {
    this.navCtrl.navigateRoot( ruta, { animated: true } );

  }
}
