import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{

  constructor
  (
    public afDB: AngularFireDatabase,
    public afAuth: AngularFireAuth
  ) {

  }

  ngOnInit() {

  }

  add() {
    this.afDB.list('Users').push({
      pseudo: 'delano',
      name: 'roosvelt'
    })
  }

  logout() {
    this.afAuth.signOut();
  }
}
