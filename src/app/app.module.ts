import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule, AngularFireStorage } from '@angular/fire/storage';
import  { FormsModule, ReactiveFormsModule }from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Camera } from '@ionic-native/camera/ngx';


export const firebaseConfig = {
  apiKey: 'AIzaSyDpdbylLOQXD2gagfmjP-i1GapIa0TrAeA',
  authDomain: 'whatsapp-clone-db63b.firebaseapp.com',
  projectId: 'whatsapp-clone-db63b',
  storageBucket: 'whatsapp-clone-db63b.appspot.com',
  messagingSenderId: '52735385625',
  appId: '1:52735385625:web:35519fb143030288f50a88',
  measurementId: 'G-21T4BDNRHF'
};

@NgModule({
  declarations: [
    AppComponent,
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    AngularFireAuthModule
  ],
  providers: [
    {
      provide: RouteReuseStrategy,
      useClass: IonicRouteStrategy,
    },
    Camera
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
