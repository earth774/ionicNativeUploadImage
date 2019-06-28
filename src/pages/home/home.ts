import { Component } from '@angular/core';
import { NavController, ActionSheetController } from 'ionic-angular';
import { IonicSelectableComponent } from 'ionic-selectable';
import { Camera, CameraOptions } from '@ionic-native/camera';
class Port {
  public id: number;
  public name: string;
}
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  ports: Port[];
  port: Port;
  image: string = '';

  constructor(
    private camera: Camera,
    public actionSheetCtrl: ActionSheetController
  ) {
    this.ports = [
      { id: 1, name: 'Tokai' },
      { id: 2, name: 'Vladivostok' },
      { id: 3, name: 'Navlakhi' }
    ];
    this.presentUploadImage().then((data: any) => {
      this.image = data;
      console.log(data);
    });
  }

  portChange(event: {
    component: IonicSelectableComponent,
    value: any
  }) {
    console.log('port:', event.value);
    console.log('port:', this.port.id);
  }

  getImage(sourceType) {
    return new Promise((resolve, reject) => {
      const options: CameraOptions = {
        quality: 100,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        // mediaType: this.camera.MediaType.PICTURE,
        sourceType: sourceType,
        correctOrientation: true,
        saveToPhotoAlbum: false
      }
      this.camera.getPicture(options).then((imageData) => {
        resolve('data:image/jpeg;base64,' + imageData);
      }, (err) => {
        reject(err);
      });
    });
  }

  presentUploadImage() {
    return new Promise((resolve, reject) => {
      let actionSheet = this.actionSheetCtrl.create({
        title: 'อัพโหลดรูป',
        buttons: [
          {
            text: 'ถ่ายรูป',
            icon: 'ios-camera',
            handler: () => {
              console.log('Destructive clicked');
              resolve(this.getImage(1));
            }
          },
          {
            text: 'เลือกรูป',
            icon: 'ios-images',
            handler: () => {
              resolve(this.getImage(0));
            }
          },
          {
            text: 'ปิด',
            icon: 'ios-close',
            role: 'cancel',
            handler: () => {
              resolve('camcel');
              console.log('Cancel clicked');
            }
          }
        ]
      });

      actionSheet.present();
    });

  }


}
