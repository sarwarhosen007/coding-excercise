import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})

export class UserService {

  /**
   * Api base url of user service
   */
  private API_BASE_URL = "http://localhost:3000/";

  /**
   * Creates an instance of user service.
   * @param httpClient 
   */
  constructor(private httpClient: HttpClient) { }

  /**
   * Gets users
   * @returns api response 
   */
  getUsers(){ 
    return this.httpClient.get(this.API_BASE_URL+'users');
  }

  /**
   * Gets user
   * @param userName 
   * @returns Api api response
   */
  getUser(userName:string){
    return this.httpClient.get(`${this.API_BASE_URL}users/${userName}`)
  }

}
