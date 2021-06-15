/* eslint-disable @typescript-eslint/dot-notation */
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { UserServiceService } from './user-service.service';
import { IUser } from '../interfaces/IUser';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  users = [];

  constructor(
    public firestore: AngularFirestore,
    public authService: UserServiceService
  ) {
    this.getAlluser();
  }

  getAlluser() {
    this.firestore.collection('users').snapshotChanges(['added', 'removed', 'modified'])
    .subscribe(actions => {
      this.users = [];
      actions.forEach(action => {
        // eslint-disable-next-line @typescript-eslint/dot-notation
        if(this.authService.getCurrentUser().uid !== action.payload.doc.data()['uid']){
          this.users.push(action.payload.doc.data());
        }
      });
    });
  }

  emptyUser(): IUser {
    return {
      email: '',
      uid: '',
      name: '',
      profile: '',
      isCurrentLogged: false,
      lastConnection: new Date(),
      emailVerified: false
    };
  }

  getUser(id: string) {
    // eslint-disable-next-line prefer-const
    let user = this.emptyUser();
    this.firestore.collection('users').snapshotChanges(['added', 'removed', 'modified'])
    .subscribe(actions => {
      actions.forEach(action => {
        console.log(id, action.payload.doc.data()['uid']);

        if(id === action.payload.doc.data()['uid']){
          // console.log(action.payload.doc.data());

          user.email = action.payload.doc.data()['email'];
          user.uid = action.payload.doc.data()['uid'];
          user.name = action.payload.doc.data()['name'];
          user.profile = action.payload.doc.data()['profile'];
          user.isCurrentLogged = action.payload.doc.data()['isCurrentLogged'];
          user.lastConnection = action.payload.doc.data()['lastConnection'];
          user.emailVerified = action.payload.doc.data()['emailVerified'];

        }
      });
    });

    return user;
  }
}
