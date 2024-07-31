import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { tunos } from 'src/app/asignacion/interfaces/ariel';
import { IOrdenFabricacion } from '../../interfaces/orden-fabricacion';
import { UiServiceService } from 'src/app/shared/services/ui-service.service';
import { OrdenFabricacionService } from '../../services/orden-fabricacion.service';
import {
  DocumentLine,
  IResponseEUFI,
  ProductionOrderLine,
} from '../../interfaces/eufi';
import { Message } from 'primeng/api';

@Component({
  selector: 'app-orden-fabricacion',
  templateUrl: './orden-fabricacion.component.html',
})
export class OrdenFabricacionComponent implements OnInit {


  constructor(
    private navCtrl: NavController,
    private ui: UiServiceService,
    private ordenFabricacionService: OrdenFabricacionService
  ) {}

  ngOnInit() {
    this.showInfoViaMessages();
  }
  date?: string;

  turnos: string[] = tunos;
  selectTurno?: string;
  isLoading = false;

  ofs: string[] = [];
  selectOf?: string;

  ofsDetalleProd: ProductionOrderLine[] = [];

  clonedOrdenFabricacion: { [s: number]: ProductionOrderLine } = {};

  ordenFabricacionSave?: IOrdenFabricacion;

  ofDetalle?: IResponseEUFI;

  validationDocLine: DocumentLine[] = [];

  notificarOrdenFabricacion() {
    this.isLoading = true;

    this.ordenFabricacionService.checkStockAvailability().subscribe({
      next: (resp) => {
        if (!this.selectOf || !this.selectTurno || !this.date) {
          this.ui.presentToast('Por favor, complete los campos obligatorios');
          return;
        }
        this.validationDocLine = resp.DocumentLines;
        this.validationDocLine.forEach((item) => {
          let ofsDetalle: ProductionOrderLine[] = this.ofsDetalleProd.filter(
            (of) => of.ItemType === 'pit_Item' && of.ItemNo === item.ItemCode
          );

          ofsDetalle.forEach((detalle) => {
            if (detalle.IssuedQuantity > item.Quantity) {
              detalle.isNotStockItem = item.Quantity;
            } else {
              delete detalle.isNotStockItem;
            }
          });

          this.ofsDetalleProd.forEach((detalle, index) => {
            const updatedDetalle = ofsDetalle.find(
              (of) =>
                of.ItemType === detalle.ItemType && of.ItemNo === detalle.ItemNo
            );
            if (updatedDetalle) {
              this.ofsDetalleProd[index] = updatedDetalle;
            }
          });
        });

        if (!this.ofDetalle) {
          this.ui.presentToast('No se ha encontrado la orden de fabricación');
          this.isLoading = false;
          return;
        }
        console.log(this.ofsDetalleProd);

        const verify_items_stock = this.ofsDetalleProd.filter(
          (of) => of.isNotStockItem !== undefined && of.isNotStockItem !== null
        );
        console.log(verify_items_stock);
        if (verify_items_stock.length > 0) {
          this.ui.presentToast('Existen valores con stock insuficiente');
          this.isLoading = false;
          return;
        }

        this.ordenFabricacionSave = {
          numero_orden: this.selectOf,
          nivel_orden: '1',
          fecha_produccion: this.date,
          turno: this.selectTurno,
          codigo: this.ofDetalle.ItemNo,
          descripcion: this.ofDetalle.ProductDescription,
          cantidad_planificada: this.ofDetalle.PlannedQuantity,
          cantidad_completada: this.ofDetalle.CompletedQuantity,
          cantidad_rechazada: this.ofDetalle.RejectedQuantity,
          unidad_medida: this.ofDetalle.InventoryUOM,
          recursos: this.ofsDetalleProd,
        };
        console.log(this.ordenFabricacionSave);
        this.isLoading = false;
        this.ordenFabricacionService
          .createOrdenFabricacion(this.ordenFabricacionSave)
          .subscribe({
            next: (resp) => {
              console.log(resp);
              this.ui.presentToast('Orden de fabricación creada');
              this.isLoading = false;
            },
            error: (err) => {
              console.log(err);
              this.ui.presentToast('Error al crear la orden de fabricación');
              this.isLoading = false;
            },
          });
      },
      error: () => {
        this.ui.presentToast('Error al obtener la disponibilidad de stock');
        this.isLoading = false;
      },
    });
  }

  onRowEditInit(of: ProductionOrderLine, index: number) {
    this.clonedOrdenFabricacion[index] = { ...of };
  }

  onRowEditSave(index: number) {
    if (this.clonedOrdenFabricacion[index]) {
      delete this.clonedOrdenFabricacion[index];
      this.ui.presentToast('Orden de fabricación actualizada');
    } else {
      this.ui.presentToast('No se puede actualizar la orden de fabricación');
    }
  }

  onRowEditCancel(index: number) {
    this.ofsDetalleProd[index] = this.clonedOrdenFabricacion[index];
    delete this.clonedOrdenFabricacion[index];
  }

  onSelectOfChange(event: any) {
    this.isLoading = true;
    this.selectOf = event.value;

    this.ordenFabricacionService.getDetalleOrdenFabricacion().subscribe({
      next: (resp) => {
        this.ofsDetalleProd = resp.ProductionOrderLines;
        this.ofDetalle = resp;
        this.isLoading = false;
      },
      error: (err) => {
        console.log(err);
        this.ui.presentToast(
          'Error al obtener el detalle de la orden de fabricación'
        );
        this.isLoading = false;
      },
    });
  }

  goHome() {
    this.navCtrl.navigateBack('/dashboard');
  }

  getOrdenFabricacion() {
    this.ofs = [
      'OF-0001',
      'OF-0002',
      'OF-0003',
      'OF-0004',
      'OF-0005',
      'OF-0006',
      'OF-0007',
      'OF-0008',
      'OF-0009',
      'OF-0010',
    ];
  }
  msgs: Message[] = [];
  showInfoViaMessages() {
    this.msgs = [];
    this.msgs.push({
      severity: 'info',
      summary: 'Notificación de Orden de Fabricación',
      detail:
        'Registre, consulte y notifique el estado de las órdenes de fabricación.',
      icon: 'pi pi-file',
    });
  }
}
