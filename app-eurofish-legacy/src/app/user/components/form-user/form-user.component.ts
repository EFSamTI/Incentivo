import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { IUsers } from '../../interfaces/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { IResponseRole, IRoleAndOptions } from '../../interfaces/rol';
import { RolService } from '../../services/roles.service';
import { UiServiceService } from 'src/app/shared/services/ui-service.service';
import { PrimeNGConfig } from 'primeng/api';
import { FileSelectEvent } from 'primeng/fileupload';

@Component({
  selector: 'app-form-user',
  templateUrl: 'form-user.component.html',
})
export class FormUserComponent implements OnInit {
  @Input() displayForm: boolean = false;
  @Input() user?: IUsers;

  @Output() onClose = new EventEmitter<boolean>();
  @Output() onSave = new EventEmitter<any>();

  isLoading = false;
  userForm: FormGroup;
  listRoles: IRoleAndOptions[] = [];

  uploadedFiles: any[] = [];
  selectFile?: File;

  constructor(
    private usuarioService: UsuarioService,
    private fb: FormBuilder,
    private rolService: RolService,
    private uiService: UiServiceService,
    private primengConfig: PrimeNGConfig
  ) {
    this.userForm = this.fb.group({
      username: ['', [Validators.required]],
      name: ['', [Validators.required]],
      password: ['', [Validators.required]],
      roles: ['', [Validators.required]],
    });
  }

  get username() {
    return this.userForm.controls['username'];
  }

  get name() {
    return this.userForm.controls['name'];
  }

  get password() {
    return this.userForm.controls['password'];
  }

  get roles() {
    return this.userForm.controls['roles'];
  }

  onFileSelect(event: FileSelectEvent) {
    if (event.files.length > 0) {
      this.selectFile = event.files[0];
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['user'] && this.user) {
      this.userForm.patchValue({
        username: this.user.username,
        name: this.user.name,
        roles: this.user.roles.map((rol) => rol),
      });
    }
  }

  ngOnInit() {
    this.primengConfig.setTranslation({
      choose: 'Elegir',
      upload: 'Subir',
      cancel: 'Cancelar',
    });
    this.loadRoles();
  }

  loadRoles() {
    this.rolService.getRoles().subscribe({
      next: (response) => {
        this.listRoles = response;
      },
      error: (error) => {
        this.uiService.alertaInformativa(error.error);
      },
    });
  }
  close() {
    this.displayForm = false;
    this.userForm.reset();
    this.onClose.emit(this.displayForm);
  }

  submit() {
    if (this.userForm.invalid) {
      return;
    }
    this.isLoading = true;
    const user = this.userForm.value;

    if (this.user) {
      this.usuarioService.updateUsuario(user, this.user.userId).subscribe({
        next: () => this.handleSuccess(),
        error: (error) => this.handleError(error),
      });
    } else if (this.selectFile) {
      this.usuarioService.registerUsuario(user, this.selectFile).subscribe({
        next: () => this.handleSuccess(),
        error: (error) => this.handleError(error),
      });
    } else {
      this.uiService.presentToast('Algo salio mal, intenta de nuevo');
      this.isLoading = false;
    }


  }

  handleSuccess() {
    const message = this.user ? 'Usuario actualizado' : 'Usuario creado';
    this.uiService.alertaInformativa(message);
    this.onSave.emit();
    this.isLoading = false;
    this.close();
  }

  handleError(error: any) {
    this.uiService.alertaInformativa(error.error);
    this.isLoading = false;
  }
}
