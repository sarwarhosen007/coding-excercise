import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from 'src/app/model/user';
import { MatTableDataSource } from '@angular/material/table';
 
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
 
})
export class UserComponent implements OnInit {

  /**
   * Inject User Service
   */
  constructor(private userService: UserService) {}

  /**
   * Users  of user component
   */
  users!: MatTableDataSource<User>;

  /**
   * First Time Assing loading is true
   */
  isLoading = true;

  /**
   * Displayed columns of user component
   */
  displayedColumns: string[] = [
    'sl_no',
    'userName',
    'gitHubProfileUrl',
    "actions"
  ]; 
  
  /**
   * on init
   */
  ngOnInit(): void {
    
    this.userService.getUsers().subscribe((response:any)=>{
      /**
       * Hide The Loader From View
       */
      this.isLoading = false;
      
      /**
       * Assign MatTable Datasource using Organizations data From Response
      */
       this.users = new MatTableDataSource(response);
    },err=>{
      this.isLoading=false;
    });
  }

}
