import { Component } from '@angular/core';
import { UsersService } from '../services/users.service';
import { LocalStorage } from '../services/local-storage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent {
  nbrOfClients = 0;
  nbrOfAdmins = 0;
  nbrOfUsers = 0;
  users!: any;
  constructor(private userService: UsersService, private localSt: LocalStorage,private route: Router) { }
  connecter!: Boolean;

  ngOnInit(): void {
    
    this.userService.getClients().subscribe((data: any) => {
      
      this.nbrOfClients = data.length;
      console.log(data);
    });
    this.userService.getAdmins().subscribe((data: any) => {
      this.nbrOfAdmins = data.length;
      console.log(data);
    });
    this.userService.getAllUsers().subscribe((data: any) => {
      this.nbrOfUsers = data.length;
      console.log(data);
    });
    this.userService.getAdmins().subscribe(
      (data) => {
        this.users = data;
      },
      (error) => {
        console.error('Error fetching admins:', error);
      }
    );
   
  }
  signOut() {
    this.localSt.Signout();
    this.connecter = false;
    this.route.navigate(["login"]);
  }
}



