import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from 'src/app/model/user';
 
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
 
})
export class UserComponent implements OnInit {
  constructor(private userService: UserService) {}

  isLoading = true;
  users: User[] = [];

  dataSource = this.users;

  displayedColumns: string[] = [
    'sl_no',
    'userName',
    'gitHubProfileUrl',
    "actions"
  ]; 
  
  ngOnInit(): void {
    this.userService.getUsers().subscribe((response:any)=>{
      this.isLoading = false;
      this.dataSource = response
    },err=>{
      this.isLoading=false;
    });
  }

}
