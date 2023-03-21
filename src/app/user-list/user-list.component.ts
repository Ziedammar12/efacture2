import { Component,  OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { User } from '../models/User.model';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit , OnDestroy {

  users: User[] = [];
  usersSubscription: Subscription = new Subscription;

  currentIndex = -1;
  page = 1;
  count = 0;
  pageSize = 3;
  pageSizes = [3,6,9];
  searchtext!: string;


  constructor(private usersService: UsersService, private router: Router){ }

  ngOnInit(): void {
    
    this.usersSubscription = this.usersService.usersSubject.subscribe(
      (users: User[]) => {
        this.users = users;
      }
    );
    this.usersService.getUsers();
    this.usersService.emitUsers();
  }

  onNewUser() {
    this.router.navigate(['/users', 'new']);
  }

  onDeleteUser(user: User){
    this.usersService.removeUser(user);
  }

  onViewUser(id: number) {
    this.router.navigate([ '/single-user', id]);
  }

  ngOnDestroy() {
    this.usersSubscription.unsubscribe();
  }
  /*firstcaractername(x:string){

     console.log('ici '+x.substring(0, 1));

     return x.substring(0, 1).toUpperCase;
  }*/

  handlePageChange(event:number){
    this.page = event;
    this.usersService.getUsers();
  }
  handlePageSizeChange(event:any){
    this.pageSize = event.target.value;
    this.page = 1;
    this.usersService.getUsers();
  }

  onsearch(nomdutilisateur : string ){
      this.searchtext = nomdutilisateur;
      console.log(this.searchtext);
  }

}
