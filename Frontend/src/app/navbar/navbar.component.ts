import { Component } from '@angular/core';
import { LocalStorage } from '../services/local-storage';
import { UsersService } from '../services/users.service';
import { Router } from '@angular/router';
//import { SocialAuthService } from '@abacritt/angularx-social-login';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  connecter!: Boolean;
  constructor(private localSt: LocalStorage, private userSer: UsersService,
     private route: Router) {
    if (localSt.isLoggedIn()) {
      this.connecter = true;
    } else {
      this.connecter = false;
    }
  }
  signOut() {
    this.localSt.Signout();
    this.connecter = false;
    this.route.navigate(["login"]);
  } 
  
}


