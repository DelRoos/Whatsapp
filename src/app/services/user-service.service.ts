import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { IUser } from '../interfaces/IUser';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  userData: any;

  constructor(
    public afDB: AngularFireDatabase,
    public afSG: AngularFireStorage,
    private afAuth: AngularFireAuth,
    private afST: AngularFirestore,

    private router: Router
    ) {
        this.afAuth.authState.subscribe(user => {
          if(user){
            this.userData = user;
            localStorage.setItem('user', JSON.stringify(this.userData));
          }else{
            localStorage.setItem('user', null);
          }
        });
     }

  signIn(email: string, password: string){
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  register(email: string, password: string, name: string){
    const userName = name;
    return this.afAuth.createUserWithEmailAndPassword(email, password)
    .then(res=>{
     this.setUserData(res.user, userName, userName);
      res.user.sendEmailVerification();
      window.alert('s\'il vous plait verifier votre compte mail et activer votre compte');
    });
  }

  passwordReset(email: string){
    return this.afAuth.sendPasswordResetEmail(email)
    .then(()=>{
      window.alert('verifier votre boite mail pour reinitialiser le mot de passe');
    });
  }

  get isLogged(): boolean{
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null && user.emailVerified !== false) ? true : false;
  }

  get isEmailVerified(): boolean{
    const user = JSON.parse(localStorage.getItem('user'));
    return (user.emailVerified !== false) ? true : false;
  }

  setUserData(user, name: string, profile: string) {
    const userName = name;
    const userProfile = profile;
    const userRef: AngularFirestoreDocument<any> = this.afST.doc(`users/${user.uid}`);
    const userData: IUser = {
      uid: user.uid,
      email: user.email,
      name: userName,
      profile: userProfile,
      emailVerified: user.emailVerified
    };
    return userRef.set(userData, { merge:true });
  }



  signOut(){
    return this.afAuth.signOut()
            .then(()=>{
              localStorage.removeItem('user');
              this.router.navigate(['/login']);
            });
  }
}
