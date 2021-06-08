import { Component, OnInit } from '@angular/core';
import { AngularFireAuthModule, AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  userForm = {
    email: '',
    password: ''
  }

  user = {
    id: '',
    email: '',
  }

  connected: boolean;

  constructor(
    public afAuth: AngularFireAuth
  ) { }

  ngOnInit() {
    this.afAuth.authState.subscribe(auth => {
      if (!auth) {
        this.connected = false;
        console.log('please log your');
      } else {
        this.connected = true;
        console.log('you are loddes');
        this.user.id = auth.uid,
        this.user.email = auth.email
      }
    })
  }

  login() {
    console.log(this.userForm);
    this.afAuth.signInWithEmailAndPassword(this.userForm.email, this.userForm.password);
    this.userForm = {
      email: '',
      password: ''
    }
  }

  logout() {
    this.afAuth.signOut();
  }

}
