import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { User } from '../Model/user';
import Swal from 'sweetalert2';
import { UsersService } from '../services/users.service';
import { LocalStorage } from '../services/local-storage';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.scss']
})
export class EditprofileComponent implements OnInit {

  user = new User();
  newPwd !: string;
  cantpass!: string;



  constructor(private userServ: UsersService, private localStorage: LocalStorage) { }
  


  ngOnInit(): void {
    this.getUser()


  }
  getUser() {
    this.userServ.getUserById(this.localStorage.getUserId()).subscribe({
      next: (data: any) => {

        console.log(data)
        this.user = data;
        this.cantpass = this.user.password;
        this.user.password = '';
      },
      error: (err: any) => {
        console.log(err)
      },
      complete: () => {
      },
    })
  }
  modifierProfil() {
    this.user.password = this.newPwd;
    console.log(this.user)
    this.userServ.modifierProfil(this.user).subscribe({
      next: (data: any) => {
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Utilisateur modifié avec succès!',
        });
        console.log(data)

      },
      error: (err: any) => {
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: 'Cet email appartient à un autre utilisateur!',
        });

        console.log(err)

      },
      complete: () => {

      },
    })

  }
}
