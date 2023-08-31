import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { LocalStorage } from '../services/local-storage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admins-list',
  templateUrl: './admins-list.component.html',
  styleUrls: ['./admins-list.component.scss']
})
export class AdminsListComponent implements OnInit {
  users!: any;
  dataexist=false;
 // role = false;
  constructor(private usersService: UsersService, private localSt: LocalStorage, private route: Router){ }
  ngOnInit(): void {
    this.usersService.getAdmins().subscribe(
      (data) => {
        this.users = data;
        if(this.users.length!=0){
          this.dataexist=true
        }
      },
      (error) => {
        console.error('Error fetching admins:', error);
      }
    );

  
  }

}


 

   
