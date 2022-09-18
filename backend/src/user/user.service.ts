import { ForbiddenException, HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { catchError, lastValueFrom, map } from 'rxjs';

@Injectable()
export class UserService {

  API_BASE_URL:string='https://24pullrequests.com/';

  constructor(
    private readonly httpService: HttpService,
  ){} 

/**
 * Gets users
 * @returns List Of Users
 */
async getUsers() {

    /**
     * API url for get users
    */
    const userListApi = this.API_BASE_URL+'users.json';

    /**
     * 1. HTTP Get request for users
     * 2. Get First 10 User
     * 3. Throw ForbiddenExceptin If error Ocure
     */
    const usersApiRequest =  this.httpService.get(userListApi)
      .pipe(map((res) => res.data?.slice(0,10)))
      .pipe( 
        catchError(() => {
          throw new ForbiddenException('API not available');
        }),
      );
    const usersResult = await lastValueFrom(usersApiRequest);

    /**
     * 1. Map through users data
     * 2. Get Only nickname & github_profile
     */
    const users = usersResult.map((user: { nickname: string; github_profile: string; })=>{
      return {
        userName: user.nickname,
        gitHubProfileUrl:user.github_profile
      }
    });

    //Return The Usesr Data
    return users;

  }

/**
 * Gets user
 * @param userName 
 * @returns User Details  
 */
async getUser(userName:string) {

    /**
     * API url for get user Details
     */
    const userDetailsApi = `${this.API_BASE_URL}users/${userName}.json`;

    /**
     * 1. HTTP Get request for User Details
     * 2. Throw ForbiddenExceptin If error Ocure
     */
    const userApiRequest = this.httpService.get(userDetailsApi)
      .pipe(map((res) => res.data))
      .pipe( 
       catchError(() => {
         throw new ForbiddenException('API not available');
       }),
     );
     
    const userInfo = await lastValueFrom(userApiRequest);

    /** 
     * 1. If user details available?
     * 2. Sort The PUllRequests using created_at and in descending order
     * 3. Return The Usere Details
     */
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
            repoName:eachPullRequest.repo_name,
            created_at:eachPullRequest.created_at
          }
        })
      }
     }

     throw new NotFoundException('User Not Found')
  }

}
