import { Injectable } from '@angular/core';
import firebase from 'firebase/compat/app';
import 'firebase/firestore';
import 'firebase/auth';


import { Subject } from 'rxjs';
import { User } from '../models/User.model';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { endBefore, limit, orderBy, startAfter } from 'firebase/firestore';
import { FirebaseAppModule } from '@angular/fire/app';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  users: User[] = [];
  usersSubject = new Subject<User[]>();
  HttpService: any;
  disable_next: boolean = false;
  angularFirestore: any;
  firstInResponse: any;
  tableData= [] as any ;
  pagination_clicked_count: any;
  push_prev_startAt: any;
  disable_prev: boolean = false;
  prev_strt_at: any;
  update: any;

  constructor(private firebase: AngularFireDatabase) { }

  emitUsers() {
    this.usersSubject.next(this.users);
  }

  /*getData(){
    return this.HttpService.get('https://bookshelves-2f2ce-default-rtdb.firebaseio.com');
   }*/

  saveUsers() {
    firebase.database().ref('/users').set(this.users);
  }

  getUsers() {
    firebase.database().ref('/users')
       .on( 'value', (data: { val: () => User[]; }) => {
         this.users = data.val() ? data.val() : [];
         this.emitUsers();
       });
   }

  getSingleUser(id: number) {
    console.log(id);
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/users/' +id).once('value').then(
          (data: { val: () => unknown; }) => {
            resolve(data.val());
          }, (error: any) => {
            reject(error);
          }
        );
      }
    );

  }

  createNewUser(newUser: User) {
    this.users.push(newUser);
    this.saveUsers();
    this.emitUsers();
  }

  removeUser(user: User) {
    if (user.photo) {
      const storageRef = firebase.storage().refFromURL(user.photo);
      storageRef.delete().then(
        () => {
          console.log('photo supprimée !');
        }
      ).catch(
        (error: string) => {
          console.log('Fichier non trouvé : ' + error);
        }
      );
    }


    const userIndexToRemove = this.users.findIndex(
               (userEl: User) => {
        if(userEl === user) {
          return true;
        }
      }
    );
    this.users.splice(userIndexToRemove, 1);
    this.saveUsers();
    this.emitUsers();
  }

 



}


