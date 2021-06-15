/* eslint-disable prefer-const */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { IUser } from '../../interfaces/IUser';
import { UsersService } from '../../services/users.service';
import { UserServiceService } from '../../services/user-service.service';


@Component({
  selector: 'app-group',
  templateUrl: './group.page.html',
  styleUrls: ['./group.page.scss'],
})
export class GroupPage implements OnInit {
  userHasSelect: boolean;
  describe: string;
  type: string;
  users = [];
  onlyAdmin = false;
  currentUser: IUser;

  constructor(
    private userService: UsersService,
    private modalCtrl: ModalController,
    private router: Router,
    private auhtService: UserServiceService,
  ) { }

  ngOnInit() {
    this.userHasSelect = false;
    this.currentUser = this.auhtService.getCurrentUser();
  }

// fermer le modal
  dismissModal() {
    this.modalCtrl.dismiss();
  }

// redirection dans le chat apres la creation
  personalChat(uid: string) {
    this.dismissModal();
    this.router.navigate(['chat-detail', uid]);
  }

  setUserSelected(){
    this.userHasSelect = true;
  }

  addUserInGroup(event, user) {
    this.users = this.users.filter(tmpUser => !(tmpUser.uid ===  user.uid));

    if(event.target.checked) {
      this.users.push(user);
    }else{
      this.users = this.users.filter(tmpUser => !(tmpUser.uid ===  user.uid));
    }
  }

  generateGroup(){
    // userHasSelect: boolean;
    // describe: string;
    // type: string;
    // users = [];
    // onlyAdmin = false;
    // currentUser: IUser;
    let member = [];
    for (const user of this.users) {
      member.push({
        userId: user.uid,
        isAdmin: false
      });
    }

    member.push({
      userId: this.currentUser.uid,
      isAdmin: true
    });

    let group = {
      profile: this.describe,
      describe: this.describe,
      onlyAdmin: this.onlyAdmin,
      members: member
    };
  }

}
