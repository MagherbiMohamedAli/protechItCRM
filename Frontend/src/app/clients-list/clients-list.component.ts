import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-clients-list',
  templateUrl: './clients-list.component.html',
  styleUrls: ['./clients-list.component.scss']
})
export class ClientsListComponent implements OnInit {
  users!: any;


  constructor(private usersService: UsersService, private router: Router, private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.usersService.getClients().subscribe(
      (data) => {
        this.users = data;
      },
      (error) => {
        console.error('Error fetching clients:', error);
      }
    );
  }
  deleteUser(id: number){
    this.usersService.deleteClient(id).subscribe(
      () => {
      console.log('Utilisateur supprimé!');
      Swal.fire({
        icon: 'success',
        title: 'Supprimé!',
        text: 'Utilisateur supprimé',
      })
      const currentUrl= this.router.url;
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigateByUrl(currentUrl);
      });
      
      },
      (error) => {
      console.error("Utilisateur n'existe pas", error);
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'Utilisateur introuvable',
      })
      }
    );
  }
  

  
}
