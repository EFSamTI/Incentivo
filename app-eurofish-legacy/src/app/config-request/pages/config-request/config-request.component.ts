import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../../services/config.service';
import { UiServiceService } from 'src/app/shared/services/ui-service.service';
import {  NavController } from '@ionic/angular';
import { IConfiRequiest } from '../../interfaces/config-response';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-config-request',
  templateUrl: './config-request.component.html'
})

export class ConfigRequestComponent  implements OnInit {

  formConfig: FormGroup;
  isLoading = false;
  listConfigRequest: IConfiRequiest[] = [];
  selectConfigsRequest: IConfiRequiest[] = [];

  tipos = [ 'Ariel', 'Tali'];
  selectTipo?:string;
  ambientes = ['Desarrollo', 'Produccion', 'Pruebas'];
  selectAmbiente?:string;

  select?: IConfiRequiest;
 openDialog = false;
  constructor(
    private ui: UiServiceService,
    private configService: ConfigService,
    private navCtrlr: NavController,
    private fb: FormBuilder
  ) { 
    this.formConfig = this.fb.group({
      source: ['', Validators.required],
      destination: ['', Validators.required],
      operation: ['', Validators.required],
      verb: ['', Validators.required],
      path: ['', Validators.required],
      tipo: ['', Validators.required],
      ambiente: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.loadConfigRequest();
  }

  get source() {
    return this.formConfig.controls['source'];
  }

  get destination() {
    return this.formConfig.controls['destination'];
  }

  get operation() {
    return this.formConfig.controls['operation'];
  }

  get verb() {
    return this.formConfig.controls['verb'];
  }

  get path() {
    return this.formConfig.controls['path'];
  }

  get tipo() {
    return this.formConfig.controls['tipo'];
  }

  get ambiente() {
    return this.formConfig.controls['ambiente'];
  }

  onSelectConfig(config?: IConfiRequiest) {
    this.select = config;
    if (config) {
      this.formConfig.patchValue({
        source: config.source,
        destination: config.destination,
        operation: config.operation,
        verb: config.verb,
        path: config.path,
        tipo: config.tipoRequest.nombre_tipo,
        ambiente: config.ambiente.nombre_ambiente,
      });
      this.openDialog = true;
    } else {
      this.openDialog = true;
    }
  }


  onSumit() {
    if (this.formConfig.invalid) {
      this.ui.alertaInformativa('Formulario invalido');
      return;
    }
    this.isLoading = true;
    const configRequest = this.formConfig.value;
    if (this.select) {
      configRequest.id = this.select.id;
      this.configService.updateConfigRequest(configRequest ).subscribe({
        next: () => {
          this.ui.presentToast('Configuracion actualizada');
          this.loadConfigRequest();
          this.isLoading = false;
        },
        error: (error) => {
          this.ui.alertaInformativa('Error al actualizar configuracion');
          this.isLoading = false;
        },
      });
    } else {
      this.configService.createConfigRequest(configRequest).subscribe({
        next: () => {
          this.ui.presentToast('Configuracion creada');
          this.loadConfigRequest();
          this.isLoading = false;
        },
        error: () => {
          this.ui.alertaInformativa('Error al crear configuracion');
          this.isLoading = false;
        },
      });
  }
}


  loadConfigRequest() {
    this.isLoading = true;
    this.configService.getConfigRequest().subscribe({
      next: (response) => {
        this.listConfigRequest = response;
        this.isLoading = false;
      },
      error: () => {
        this.ui.alertaInformativa('Error al cargar configuraciones');
        this.isLoading = false;
      },
    });
  }

  activarConfig(config: IConfiRequiest) {
    this.configService.activarConfigRequest(config.id).subscribe({
      next: () => {
        this.ui.presentToast('Configuracion activada');
        this.loadConfigRequest();
      },
      error: () => {
        this.ui.alertaInformativa('Error al activar configuracion');
      },
    });
  }

  desactivarConfig(config: IConfiRequiest) {
    this.configService.desactivarConfigRequest(config.id).subscribe({
      next: () => {
        this.ui.presentToast('Configuracion desactivada');
        this.loadConfigRequest();
      },
      error: () => {
        this.ui.alertaInformativa('Error al desactivar configuracion');
      },
    });
  }

  deleteConfigRequests() {
    const ids = this.selectConfigsRequest.map((config) => config.id);
    this.configService.deleteConfigRequest(ids).subscribe({
      next: (response) => {
        this.ui.presentToast(response);
        this.loadConfigRequest();
      },
      error: (error) => {
        this.ui.alertaInformativa('Error al eliminar configuraciones');
      },
    });
  }

  goHome() {
    this.navCtrlr.navigateBack('/dashboard');
  }


  close() {
    this.openDialog = false;
    this.formConfig.reset();
  }


}
