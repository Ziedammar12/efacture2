import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { sendPasswordResetEmail } from 'firebase/auth';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
resetPassword() {
throw new Error('Method not implemented.');
}

  signInForm!: FormGroup;
  errorMessage!: string;


  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router) {}
  
  ngOnInit(): void {
    this.initForm();
  }

  initForm(){
    this.signInForm =this.formBuilder.group({
      email: ['',[Validators.required, Validators.email]],
      password: ['',[Validators.required]],

    });
  }
  
  /*Validators.pattern('(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$'    )*/

  onSubmit(){
    const formvalue = this.signInForm.value;
      const email = formvalue['email'];
      const password = formvalue['password'];
    
    this.authService.signInUserwithLoginpassword(email, password).then (
      () => {
        this.router.navigate(['/books']);
      },
      (error) => {
        this.errorMessage = error.code;
        var errorCode = error.code;
            var errorMessage = error.message;
            if ( errorCode == 'email-already-in-use' ) {
                this.errorMessage="You already have an account with that email.";
            } else if ( errorCode == 'auth/invalid-email' ) {
                this.errorMessage="Please provide a valid email";
            } else if ( errorCode == 'auth/weak-password' ) {
                this.errorMessage="The password is too weak.";
            } else if ( errorCode == 'auth/wrong-password' ) {
                this.errorMessage="The password is worning.";
              } else if ( errorCode == 'auth/too-many-requests' ) {
                this.errorMessage=" Please try again in 34 seconds.";
            } else {
                this.errorMessage=error.message;
            }
            console.log(error);
        
      }
    );

  }
  
  
  
  SeconnecterwithGoogle(){
    this.authService.signInUserGoogle().then(
      () => {
        /*this.isauth = this.authService.isAuth;*/
        //console.log("isAuthcpt"+this.isAuthcpt);
        console.log("connexion reussie !!");
        this.router.navigate(['/book-list']);
      },
    ).catch(
        (error) => {
        //this.isAuthcpt =false;
        this.errorMessage = error.message;
        console.log(error.message+"connexion error !!");
       }
    );
      }   
     
    
  }
