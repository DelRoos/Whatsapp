import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { UserServiceService } from '../../services/user-service.service';
import { IUser } from 'src/app/interfaces/IUser';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.page.html',
  styleUrls: ['./all-users.page.scss'],
})
export class AllUsersPage implements OnInit {

  usersList = [];

  constructor(
    private userService: UsersService,
    private modalCtrl: ModalController,
    private router: Router
  ) {
  }

  ngOnInit() {
  }


  dismissModal() {
    this.modalCtrl.dismiss();
  }

  personalChat(uid: string) {
    this.dismissModal();
    this.router.navigate(['chat-detail', uid]);
  }
}
