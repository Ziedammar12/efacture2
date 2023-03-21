import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from '@firebase/app-compat';
import { getAuth } from 'firebase/auth';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { trace } from '@angular/fire/compat/performance';
import { isPlatformServer } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authService: any;


  email='';
  password='';
  userDisposable: Subscription = new Subscription;
  getData: any;

 

  constructor(public readonly auth: AngularFireAuth, @Inject(PLATFORM_ID) platformId: object, private HttpService: HttpClient) {
    if (!isPlatformServer(platformId)) {
      this.userDisposable = this.auth.authState.pipe(
        trace('auth'),
        map(u => !!u)
      ).subscribe(isLoggedIn => {
        /*this.isAuth = isLoggedIn;*/
        console.log("isLoggedIn"+isLoggedIn);
      });
    }

   }

   /*getData(){
    return this.HttpService.get('https://bookshelves-2f2ce-default-rtdb.firebaseio.com');
   }*/

    getuid(){
      const authuid = getAuth();
      const user = authuid.currentUser;
    return (user?.uid);

   }

   

   async resetPassword(email: string) {
    const user = await this.auth.sendPasswordResetEmail(email);
  }

  async signInUserGoogle(){
    const user = await this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  async createNewUser(email:string,password:string){
    const user = await this.auth.createUserWithEmailAndPassword(email,password);
    
  }
  
  async signInUserwithLoginpassword(email:string,password:string){
    const user = await this.auth.signInWithEmailAndPassword(email, password);
  }

  signOutUser() {
    firebase.auth().signOut();
  }

}
