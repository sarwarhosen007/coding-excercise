import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private API_BASE_URL = "http://localhost:3000/";

  constructor(private httpClient: HttpClient) { }

  getUsers(){ 
    return this.httpClient.get(this.API_BASE_URL+'users');
  }

  getUser(userName:string){
    return this.httpClient.get(`${this.API_BASE_URL}users/${userName}`)
  }

}
