import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-test',
  templateUrl: './test.page.html',
  styleUrls: ['./test.page.scss'],
})

export class TestPage implements OnInit {
  items: Observable<any[]>;
  myName: string;
  images = [];

  constructor(
    public firestore: AngularFirestore,
    public afSG: AngularFireStorage,
  ) {

    this.getImageDatabase();
    this.firestore.collection('Test').snapshotChanges(['added', 'modified', 'removed'])
    .subscribe(actions =>{ actions.forEach(action => {
        console.log(action.payload.doc.data());
      });
    });
    // this.items = this.firestore.collection("Test").valueChanges();
  }


  getImageDatabase() {
    this.firestore.collection('user-profile').snapshotChanges(['added', 'modified', 'removed'])
    .subscribe(actions =>{ actions.forEach(action => {
        this.getImageLocalStorage(action);
      });
    });
  }

  getImageLocalStorage(locate: any) {
    const data = locate.payload.doc.data();
    this.afSG.ref('/'+data.profile).getDownloadURL().subscribe(imgUrl => {
      this.images.push({
        name: data.name,
        profile: imgUrl
      });
    });
  }


  addFire(){
    this.firestore.collection('Test').add({
      nom: this.myName
    });
    this.myName = '';
  }

  ngOnInit() {
  }
  setTheme() {
  console.log("ok");
  document.documentElement.style.setProperty("--ion-color-primary", "#f4f5f8");
  document.documentElement.style.setProperty("--ion-color-dark", "#FFF");
  }

}
