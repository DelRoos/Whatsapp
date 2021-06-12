import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { AlertController } from '@ionic/angular';
import { map, finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
})

export class FileUploadComponent implements OnInit {

  base64Image: string;
  selectedFile: File = null;
  downloadURL: Observable<string>;

  constructor(private camera: Camera,
    private alertCtrl: AlertController,
    private storage: AngularFireStorage) { }

  async takePhoto(sourceType: number) {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType
    };

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      this.base64Image = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      // Handle error
      console.error(err);
    });
  }

  upload(): void {
    const currentDate = Date.now();
    const file: any = this.base64ToImage(this.base64Image);
    const filePath = `Images/${currentDate}`;
    const fileRef = this.storage.ref(filePath);

    const task = this.storage.upload(`Images/${currentDate}`, file);
    task.snapshotChanges()
      .pipe(finalize(() => {
        this.downloadURL = fileRef.getDownloadURL();
        this.downloadURL.subscribe(downloadURL => {
          if (downloadURL) {
            this.showSuccesfulUploadAlert();
          }
          console.log(downloadURL);
        });
      })
      )
      .subscribe(url => {
        if (url) {
          console.log(url);
        }
      });
  }

  async showSuccesfulUploadAlert() {
    const alert = await this.alertCtrl.create({
      cssClass: 'basic-alert',
      header: 'Uploaded',
      subHeader: 'Image uploaded successful to Firebase storage',
      message: 'Check Firebase storage.',
      buttons: ['OK']
    });

    await alert.present();
  }


  base64ToImage(dataURI) {
    const fileDate = dataURI.split(',');
    // const mime = fileDate[0].match(/:(.*?);/)[1];
    const byteString = atob(fileDate[1]);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([arrayBuffer], { type: 'image/png' });
    return blob;
  }

  ngOnInit(){}

}
// fileName: string;
// fileSize: string;
// isLoading: boolean;
// isLoaded: boolean;
// private imageCollection: AngularFirestoreCollection<ImageData>;


// constructor(
//   private database: AngularFirestore,
//   private storage: AngularFireStorage
// ) {
//   this.isLoaded = false;
//   this.isLoading = false;
//  }

// ngOnInit() {}


// uploadImageToFireBase(event){
//   const file = event.target.files;
//   console.log(file);
//   // console.log(file);
//   // this.fileName = file[0];
//   // console.log(this.fileName);

//   // if(file.type.split('/')[0] !== 'image'){
//   //   console.error('This file is not an image');
//   //   return;
//   // }

// }
