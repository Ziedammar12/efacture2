import { Component } from '@angular/core';
import { FirebaseApp } from '@angular/fire/compat';
import { AuthService } from './services/auth.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  HttpService: any;

  


  constructor(public readonly firebaseApp: FirebaseApp, private auth: AuthService) {}

  ngOnInit(){
   // this.getData();
  }
/*
  p:any;
  data:any=[];
  getData() {
    this.auth.getData().subscribe(
      (data) => {
        this.data = data ;
        console.log(this.data)
      }
    );
  }*/

  

  title = 'efacture';
}


