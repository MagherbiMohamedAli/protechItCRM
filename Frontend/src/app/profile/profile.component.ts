//import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Component, OnInit } from '@angular/core';
import { User } from '../Model/user';
import { UsersService } from '../services/users.service';
import { LocalStorage } from '../services/local-storage';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit {
  user= new User();  
  newPwd !: string;
  cantpass!:string;
  constructor(private userServ: UsersService, private localStorage: LocalStorage) { }

  ngOnInit(): void {
    this.getUser()

    
  }
  getUser(){
    this.userServ.getUserById(this.localStorage.getUserId()).subscribe({
      next:(data:any)=>{

        console.log(data)
        this.user=data;
      },
      error:(err:any)=>{
        console.log(err)
      },
      complete:()=>{ 
      },
    })
  }
  
}



 /*  userSoc!: SocialUser;
  isLoggedIn!: boolean;
  constructor(private authService: SocialAuthService) { }
  ngOnInit(): void {
    this.authService.authState.subscribe(
      data => {
        this.isLoggedIn = (data != null);
        this.userSoc = data;
      }
    );
  } */

