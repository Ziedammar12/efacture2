import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User.model';
import { UsersService } from 'src/app/services/users.service';
import { AuthService } from 'src/app/services/auth.service';
import { timeStamp } from 'console';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  UserForm!: FormGroup;
  fileIsUploading = false;
  fileUrl!: string;
  fileUploaded = false;
  uid_!:string;
  datecreation!:string;
  datemodification!:string;


  constructor(private formBuilder: FormBuilder,
              private usersService: UsersService,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
    this.initForm();
  }            
  
  initForm() {
    this.UserForm = this.formBuilder.group( {
      nomdutilisateur: ['',Validators.required],
      gid: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      etat: ['', Validators.required]
    });
  }

  onSaveUser() {

    var uid="";

    const nomdutilisateur = this.UserForm.get('nomdutilisateur')?.value;
    const gid = this.UserForm.get('gid')?.value;
    const email = this.UserForm.get('email')?.value;
    const etat =  this.UserForm.get('etat')?.value;

      const uid_ = this.authService.getuid();
      console.log('ixi'+uid_);

      const datecreation = Date.now();
      console.log('ixi'+datecreation);

      const datemodification = Date.now();
      console.log('ixi'+datemodification);
   
      const newUser = new User( nomdutilisateur, gid, email, etat, uid_, datecreation, datemodification );
    

    this.usersService.createNewUser(newUser);
    this.router.navigate(['/users']);
  }
  onBack() {
    this.router.navigate(['/users']);
  }
  
}
