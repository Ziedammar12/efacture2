import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PasswordforgetComponent } from './auth/passwordforget/passwordforget.component';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { UserFormComponent } from './user-list/user-form/user-form.component';
import { UserListComponent } from './user-list/user-list.component';
import { SingleUserComponent } from './user-list/single-user/single-user.component';

const routes: Routes = [
 
 
 {path:'', component:SigninComponent},
 {path:'auth/singin', component:SigninComponent},
 {path:'auth/singup', component:SignupComponent},
 {path:'auth/passwordforget', component:PasswordforgetComponent},

 {path:'user-list', component:UserListComponent},
 {path:'user-form', component:UserFormComponent},
 {path:'single-user/:id', component:SingleUserComponent},




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
