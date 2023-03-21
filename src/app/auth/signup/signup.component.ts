import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signUpForm!: FormGroup;
  errorMessage!: string;
  email='';
  password='';

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router) {}
  
  ngOnInit(): void {
    this.initForm();
  }

  initForm(){
    this.signUpForm =this.formBuilder.group({
      email: ['',[Validators.required, Validators.email]],
      password: ['',[Validators.required ]],

    });
  }

  onBack() {
    this.router.navigate(['/signin']);
  }
  
  //Validators.pattern('(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$')
  
  signUpOnsubmit(){
    const formvalue = this.signUpForm.value;
      const email = formvalue['email'];
      const password = formvalue['password'];
    console.log("email:"+email);
    this.authService.createNewUser(email, password).then (
      () => {
        console.log("createNewUser");
        this.router.navigate(['/books']);
      },
      (error) => {
        this.errorMessage = error.message;
      }
    );

  }

  


}
