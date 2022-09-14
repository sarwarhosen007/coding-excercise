import { ForbiddenException, HttpException, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { catchError, lastValueFrom, map } from 'rxjs';
import { orderBy, sortBy } from 'lodash'

@Injectable()
export class UserService {

  API_BASE_URL:string='https://24pullrequests.com/';

  constructor(
    private readonly httpService: HttpService,
  ){} 


  async getUsers() {

    const userListApi = this.API_BASE_URL+'users.json';

    const usersApiRequest =  this.httpService.get(userListApi)
      .pipe(map((res) => res.data?.slice(0,10)))
      .pipe( 
        catchError(() => {
          throw new ForbiddenException('API not available');
        }),
      );
     
    const unmodifiedUsers = await lastValueFrom(usersApiRequest);
    const users = unmodifiedUsers.map((user: { id: number; nickname: string; link: string; })=>{
      return {
        id: user.id,
        userName: user.nickname,
        link:user.link
      }
    });

    return users;

  }

  async getUser(userName:string) {

    const userDetailsApi = `${this.API_BASE_URL}users/${userName}.json`;

    const userApiRequest = this.httpService.get(userDetailsApi)
      .pipe(map((res) => res.data))
      .pipe( 
       catchError(() => {
         throw new ForbiddenException('API not available');
       }),
     );
     
    const userInfo = await lastValueFrom(userApiRequest);
     
    if(userInfo){
     return {
        userName:userInfo.nickname,
        githubProfile:userInfo.github_profile,
        contributionCount:userInfo.contributions_count,
        organisations:userInfo.organisations,
        pullRequests:userInfo.pull_requests.sort ( (first,second) => {
          if (first.created_at < second.created_at) return 1;
          if (first.created_at > second.created_at) return -1;
        }).map(eachPullRequest=>{
          return {
            title:eachPullRequest.title,
            repoName:eachPullRequest.repo_name
          }
        })
      }
     }
     return {
      message:'User Data Not Found'
     } 
     
  }

}
