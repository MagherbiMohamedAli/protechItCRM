import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from '../services/authentification.service';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.scss']
})
export class ForgotpasswordComponent implements OnInit {
  email: string='';
  constructor(private authService: AuthentificationService){}
  ngOnInit() {}
  sendPasswordResetEmail(){
    if(this.email){
      this.authService.forgotpwd(this.email)
      .then(()=>{
        window.alert('Email de réinitialisation est envoyé, vérifier votre boite de réception!');
      })
      .catch((error)=>{
        window.alert(error);
      });
    }
  }

}
