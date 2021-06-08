import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  user = {
    email: '',
    password: ''
  }

  connected: boolean;

  constructor(
    public afAuth: AngularFireAuth
  ) { }

  // empty the from
  emptyForm() {
    this.user = {
      email: '',
      password: ''
    }
  }
  
  ngOnInit() {
    this.afAuth.authState.subscribe(auth => {
      if (!auth) {
        this.connected = false;
        console.log('please log your');
      } else {
        this.connected = true;
        console.log('you are loddes');
      }
    })
  }

  signUp() {
    this.afAuth.createUserWithEmailAndPassword(this.user.email, this.user.password);
    this.emptyForm();
  }

  login() {
    console.log(this.user);
    this.afAuth.signInWithEmailAndPassword(this.user.email, this.user.password);
    this.user = {
      email: '',
      password: ''
    }
  }

  logout() {
    this.afAuth.signOut();
  }

}
