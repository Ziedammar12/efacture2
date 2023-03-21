/*import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/User.model';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from 'src/app/services/users.service';
import { Router } from '@angular/router';




@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent {

  UserForm!: FormGroup;
  fileIsUploading = false;
  fileUrl!: string;
  fileUploaded = false;
  uid_!:string;
  authService: any;
  usersService: any;
  router: any;

  ngOnInit(): void {}    
  
  onSaveUser() {

    var uid="";
       const id = this.UserForm.get('id')?.value;
       const nomdutilisateur = this.UserForm.get('nomdutilisateur')?.value;
       const gid = this.UserForm.get('gid')?.value;
       const email = this.UserForm.get('email')?.value;
       const etat = this.UserForm.get('etat')?.value;
   
       const uid_ = this.authService.getuid();
      console.log('ixi'+uid_);
   
      const datecreation_ = this.authService.getdatecreation();
      console.log('ixi'+datecreation_);
   
      const datemodification_ = this.authService.getdatemodification();
      console.log('ixi'+datemodification_);
      
      // const newUser = new User(id, nomdutilisateur, gid, email, uid_ , etat);
       
       datecreation_,datemodification_,
   
       //this.usersService.createNewUser(newUser);
       this.router.navigate(['/users']);
     }
   
}*/