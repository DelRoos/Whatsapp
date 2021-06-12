/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserServiceService } from '../../services/user-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.page.html',
  styleUrls: ['./password-reset.page.scss'],
})
export class PasswordResetPage implements OnInit {
  validationMessage = {
    email: [
      {type:'required', message: 'L\'email est obligatoire'},
      {type:'pattern', message: 'L\'email est incorrecte'}
    ]
  };

  ValidationFormUser: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    public userService: UserServiceService,
    public router: Router
    ) {
  }

  ngOnInit() {
    this.ValidationFormUser = this.formBuilder.group({
      // eslint-disable-next-line @typescript-eslint/quotes
      email: ['', [Validators.required, Validators.pattern("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$")]],
    });

  }

  resetPassword() {
    this.userService.passwordReset(this.ValidationFormUser.value.email);
    this.router.navigate(['/login']);
  }

}
