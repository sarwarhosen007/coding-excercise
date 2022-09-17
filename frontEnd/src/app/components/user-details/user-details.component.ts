import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  constructor(
      private userService: UserService,
      private route: ActivatedRoute
    ) {}

  isLoading = true;

  userBasicInfo = {
    userName:'',
    githubProfile:'',
    contributionCount:'',
  }
  organisations:string[] = [];
  organisationsTableColumn: string[] = ['login','avatar_url', 'link'];
 
  pullRequests:string[] = [];
  pullRequestsTableColumn: string[] = ['title','repoName'];
 

  ngOnInit(): void {
    const nickName = this.route.snapshot.params['nickName'];

    this.userService.getUser(nickName).subscribe((response:any)=>{

      this.isLoading = false;

      // basic info
      this.userBasicInfo = {
        userName:response.userName,
        githubProfile:response.githubProfile,
        contributionCount:response.contributionCount,
      }

      //organizations
      this.organisations = response.organisations;

      //pullRequests
      this.pullRequests = response.pullRequests;


    },err=>{
      this.isLoading=false;
    });
  }

}
