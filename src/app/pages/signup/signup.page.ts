/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { RegisterDataForm } from 'src/app/interfaces/registerFormData';
// import { AngularFireDatabase } from '@angular/fire/database';
// import { AngularFireStorage } from '@angular/fire/storage';
import { UserServiceService } from '../../services/user-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})

export class SignupPage implements OnInit {

  userDataInfo: RegisterDataForm;

  validationMessage = {
    surname: [{type:'required', message: 'Le nom est obligatoire'}],
    email: [
      {type:'required', message: 'L\'email est obligatoire'},
      {type:'pattern', message: 'L\'email est incorrecte'}
    ],
    password: [
      {type:'required', message: 'Le mot de passe est obligatoire'},
      {type:'minlength', message: 'le mot de passe doit avoir au mois 6 caracteres'}
    ]
  };

  ValidationFormUser: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    public userService: UserServiceService,
    public router: Router
    // public afDB: AngularFireDatabase,
    // public afSG: AngularFireStorage
  ) { }

  ngOnInit() {
    this.ValidationFormUser = this.formBuilder.group({
      surname: ['', Validators.required],
      // eslint-disable-next-line @typescript-eslint/quotes
      email: ['', [Validators.required, Validators.pattern("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$")]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

  }

  signUp(): void{
    this.userService.register(
      this.ValidationFormUser.value.email,
      this.ValidationFormUser.value.password,
      this.ValidationFormUser.value.surname
      );
    this.router.navigate(['/login']);
  }
}
