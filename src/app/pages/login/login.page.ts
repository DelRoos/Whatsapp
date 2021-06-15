import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserServiceService } from '../../services/user-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  userForm = {
    email: '',
    password: ''
  };

  constructor(
    public afAuth: AngularFireAuth,
    public userService: UserServiceService,
    public router: Router
  ) { }

  ngOnInit() {
  }

  login() {
    console.log(this.userForm);
    this.userService.signIn(this.userForm.email, this.userForm.password)
    .then((res) => {
      // if(this.userService.isEmailVerified) {
      //   this.router.navigate(['/tabs/chats']);
      // }else{
      //   window.alert('Email is not verified');
      //   return false;
      // }
      this.router.navigate(['/tabs/chats']);
    })
    .catch((error) => {
      window.alert(error);
    });

    console.log('pand have travel');

    this.userForm = {
      email: '',
      password: ''
    };
  }

}
