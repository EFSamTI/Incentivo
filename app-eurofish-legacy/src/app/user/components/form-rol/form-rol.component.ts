import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { IRoleAndOptions } from '../../interfaces/rol';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RolService } from '../../services/roles.service';
import { IOption, IOptions } from '../../interfaces/options';
import { UiServiceService } from 'src/app/shared/services/ui-service.service';

@Component({
  selector: 'app-form-rol',
  templateUrl: './form-rol.component.html',
})
export class FormRolComponent implements OnInit {
  @Input() displayForm: boolean = false;
  @Input() rol?: IRoleAndOptions;

  @Output() onClose = new EventEmitter<boolean>();
  @Output() onSave = new EventEmitter<any>();

  isLoading = false;
  rolForm: FormGroup;
  LisOptions: IOptions[] = [];

  optionForm: FormGroup;

  displayFormOption: boolean = false;


  constructor(private rolService: RolService, private fb: FormBuilder,    private uiService: UiServiceService  ) {
    this.rolForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      options: ['', Validators.required],
    });
    this.optionForm = this.fb.group({
     name_option: ['', Validators.required],
    description_option: ['', Validators.required],
      path: ['', Validators.required],
    });
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['rol'] && this.rol) {
      this.rolForm.patchValue({
        name: this.rol.roleName,
        description: this.rol.description,
        options: this.rol.roleOptions.map((rol) => rol.option.optionName),
      });
    }
  }

  get name() {
    return this.rolForm.controls['name'];
  }

  get description() {
    return this.rolForm.controls['description'];
  }

  get options() {
    return this.rolForm.controls['options'];
  }

  get name_option() {
    return this.optionForm.controls['name_option'];
  }

  get description_option() {
    return this.optionForm.controls['description_option'];
  }

  get path() {
    return this.optionForm.controls['path'];
  }


  ngOnInit() {
    this.loadOptions();
  }

  submitOption() {
    if (this.optionForm.invalid) {
      this.uiService.presentToast('All fields are required');
      return;
    }
    this.isLoading = true;


    const data:IOption = {
      name: this.optionForm.value.name_option,
      description: this.optionForm.value.description_option,
      path: this.optionForm.value.path,
    }

    this.rolService.newOption(data).subscribe({
      next: () => {
        this.uiService.presentToast('Option created successfully');
        this.optionForm.reset();
        this.loadOptions();
        this.isLoading = false;
        this.displayFormOption = false;
      },
      error: (error) => {
        this.uiService.alertaInformativa(error.error);
        this.isLoading = false;
      },
    });
  }
  

  close() {
    this.displayForm = false;
    this.rolForm.reset();
    this.onClose.emit(this.displayForm);
  }

  closeOptions() {
    this.displayFormOption = false;
    this.optionForm.reset();

  }

  loadOptions() {
    this.rolService.getOptions().subscribe({
      next: (response) => {
        this.LisOptions = response;
      },
      error: (error) => {
        this.uiService.alertaInformativa(error.error);
      },
    });
  }

  submit() {
    if (this.rolForm.invalid) {
      return;
    }
    this.isLoading = true;
    const rol = this.rolForm.value;
  
    const operation = this.rol
      ? this.rolService.updateRole(rol, this.rol.roleId)
      : this.rolService.registerRole(rol);
  
    operation.subscribe({
      next: () => this.handleSuccess(),
      error: (error) => this.handleError(error),
    });
  }
  
  handleSuccess() {
    const message = this.rol ? 'Role updated successfully' : 'Role created successfully';
    this.uiService.presentToast(message);
    this.isLoading = false;
    this.close();
    this.onSave.emit();
  }
  
  handleError(error: any) {
    this.uiService.alertaInformativa(error.error);
    this.isLoading = false;
  }
}
