import { Injectable } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UiServiceService {

  constructor( private alertController: AlertController,
               private toastController: ToastController ) { }


  async alertaInformativa( message: string ) {
    const alert = await this.alertController.create({
      message,
      buttons: ['OK']
    });

    await alert.present();
  }

  async presentToast( message: string ) {
    const toast = await this.toastController.create({
      message,
      position: 'top',
      duration: 1500
    });
    toast.present();
  }

  
async sessionExpired(message: string, callback?: () => void) {
  const alert = await this.alertController.create({
    message: message,
    buttons: [{
      text: 'OK',
      handler: () => {
        if (callback) callback();
      }
    }]
  });

  await alert.present();
}

}
