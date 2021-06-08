import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{

  constructor
  (
    public afDB: AngularFireDatabase
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

}
