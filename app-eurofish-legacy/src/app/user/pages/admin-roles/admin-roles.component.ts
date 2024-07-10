import { Component, OnInit } from '@angular/core';
import { RolService } from '../../services/roles.service';
import { IRoleAndOptions } from '../../interfaces/rol';

import { Subject, debounceTime } from 'rxjs';
import { UiServiceService } from 'src/app/shared/services/ui-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-roles',
  templateUrl: './admin-roles.component.html',
})


export class AdminRolesComponent  implements OnInit {

  listRoles: IRoleAndOptions[] = [];
  allRoles: IRoleAndOptions[] = [];
  isLoading = false;
  searchTerm = new Subject<string>();

  selectedRol?: IRoleAndOptions;
  displayForm: boolean = false;



  constructor(
    private rolService: RolService,
    private uiService: UiServiceService,
    private fb: FormBuilder
  ) { 
   
  }




 
  ngOnInit() {
    this.loadRoles();
    this.searchTerm.pipe(
      debounceTime(300)
    ).subscribe(search => this.filter(search));
  }


  
  formRol(rol?: IRoleAndOptions) {
    if (!rol) {
      this.displayForm = true;
    } else {
      this.selectedRol = rol;
      this.displayForm = true;
    }
  }

  loadRoles() {
    this.isLoading = true;
    this.rolService.getRoles().subscribe({

      next: (response) => {
        this.listRoles = response;
        this.allRoles = response;
        this.isLoading = false;
      },
      error: (error) => {
        this.uiService.alertaInformativa(error.error);
        this.isLoading = false;
      },
      
    });
  }

  deleteRole(id: number) {
    this.rolService.deleteRole(id).subscribe({
      next: () => {
        this.uiService.presentToast('Role deleted successfully');
        this.loadRoles();
      },
      error: (error) => {
        this.uiService.alertaInformativa(error.error || error.message);
      },
    });
  }

  onInput(event: Event) {
    const input = event.target as HTMLInputElement;
    this.searchTerm.next(input.value);
  }

  filter(search: string) {
    if (!search) {
      this.listRoles = [...this.allRoles];
    } else {
      this.listRoles = this.allRoles.filter(evento => evento.roleName.includes(search));
    }
  }
  save(){
    this.loadRoles();
  }


}
