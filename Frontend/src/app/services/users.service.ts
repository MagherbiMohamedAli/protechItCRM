import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../Model/user';
const URL ="http://localhost:8080/api/user";

@Injectable({
  providedIn: 'root'
})
export class UsersService {


  constructor(private http: HttpClient) { }
  getAllUsers(){
    return this.http.get(URL+"/getallusers");
  }
  getUserById(id: number){
    return this.http.get(URL+"/getUserById/"+id);
  }
  getClients(){
    return this.http.get(URL+"/getClients");
  }
  getAdmins(){
    return this.http.get(URL+"/getAdmins");
  }
  countAdmins(){
    return this.http.get(URL+"/countAdmins");
  }
  countClients(): Observable<any>{
    return this.http.get(URL+"/countClients");
  }
  deleteClient(id: Number){
    return this.http.delete(URL+`/deleteUser/${id}`);
  }
  modifierProfil(user: User): Observable<User> {
    return this.http.put<User>(URL + "/updateUser", user)
  }
  getClientByName(username:string){
    return this.http.get(URL+"/getBytitre/"+username);
  }
}


