import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import {MatPaginator} from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { OrganisationsData } from '../../model/organization';
import { PullRequest } from '../../model/pullRequest';
import { UserDetails } from 'src/app/model/user';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit,AfterViewInit {

  /**
   * Organisations & PullRequest of user details component
   */
  organisations!: MatTableDataSource<OrganisationsData>;
  pullRequests!: MatTableDataSource<PullRequest>;

  /**
   * View child of user details component for Pagination & Sorting
   */
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  
   /**
   * Inject User Service & Active Route service
   */
  constructor(
      private userService: UserService,
      private route: ActivatedRoute
    ) {}

  /**
   * First Time Assing loading is true
   */
  isLoading = true;
  
  userBasicInfo!: UserDetails;

  /**
   * Decleared Both Table Header
  */
  organisationsTableColumn: string[] = ['sl_no_org','login','avatar_url', 'link'];
  pullRequestsTableColumn: string[] = ['sl_no_pull_req','created_at','title','repoName'];
 

  /**
   * on init
   * Collect & assing all data for display in view
   */
  ngOnInit(): void {

    /**
     * Collect user NickName from Route
     */
    const nickName = this.route.snapshot.params['nickName'];

    /**
     * Get User Details data From UserService method call getuser with nickName params
     */
    this.userService.getUser(nickName).subscribe((response:any)=>{

      /**
       * After Load the Data Loading progress should be none
       */
      this.isLoading = false;

      /**
       * Assing User basic info 
      */
      this.userBasicInfo = {
        userName:response.userName,
        githubProfile:response.githubProfile,
        contributionCount:response.contributionCount,
      }

      /**
       * Assign MatTable Datasource using Organizations data From Response
      */
      this.organisations = new MatTableDataSource(response.organisations);

      /**
       * Assign MatTable Datasource using PullRequest data From Response
      */
      this.pullRequests = new MatTableDataSource(response.pullRequests);
  
    },err=>{
      this.isLoading=false;
    });
  }

  /**
   * after view init
   * Assing Both Table pagination
   */
  ngAfterViewInit(): void {
    this.organisations.paginator = this.paginator;
    this.pullRequests.paginator = this.paginator;
  }

}
