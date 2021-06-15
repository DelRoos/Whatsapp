import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../../services/user-service.service';
import { UsersService } from '../../services/users.service';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { ModalController } from '@ionic/angular';
import { AllUsersPage } from '../../pages/all-users/all-users.page';
import { GroupPage } from '../../pages/group/group.page';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.page.html',
  styleUrls: ['./chats.page.scss'],
})
export class ChatsPage implements OnInit {
  chatsList: any[] = [];
  userList = [];

  constructor(
    public authService: UserServiceService,
    public userService: UsersService,
    public firestore: AngularFirestore,
    public modalCtrl: ModalController
  ) {
  }

  logOut() {
    this.authService.signOut();
  }

  dataInit() {
    this.userList = this.userService.users;
  }

  ngOnInit() {
    this.dataInit();
  }


  async listModalUser() {
    const modal = await this.modalCtrl.create({
      component: AllUsersPage
    });
    modal.onDidDismiss().then((data) => {
    });
    await modal.present();
  }

  async modalGroup() {
    const modal = await this.modalCtrl.create({
      component: GroupPage
    });
    modal.onDidDismiss().then((data) => {
    });
    await modal.present();
  }

}
