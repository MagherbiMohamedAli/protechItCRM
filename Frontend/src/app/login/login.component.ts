import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from '../services/authentification.service';
import { Router } from '@angular/router';

import { LoginRequest } from '../Model/login-request';
import Swal from 'sweetalert2';
//import { SocialAuthService } from "@abacritt/angularx-social-login";

//import { FacebookLoginProvider } from "@abacritt/angularx-social-login";
import { LocalStorage } from '../services/local-storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChatService } from '../services/chat/chat-service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
}) 


export class LoginComponent implements OnInit {
  credentialForm!: FormGroup;
  user: any;
  loggedIn: any;
  loginReq = new LoginRequest();
  attempts= 0;
  constructor(private authSer: AuthentificationService,
    private route: Router,
    //private authService: SocialAuthService,
    private localStorage: LocalStorage,
    private chatService: ChatService,
    private fb: FormBuilder
    ) {
  }
  connexion(form: any) {

    console.log(this.loginReq)
    this.authSer.loginclient(this.loginReq).subscribe({
      next: (data: any) => {

        this.localStorage.saveToken(data.token);
        this.localStorage.saveUsername(data.username);
        this.localStorage.saveUserId(data.user.id);
        this.localStorage.saveUser(data.user);
        this.localStorage.saveAuthorities(data.user.roles);
        if (data.user.roles[0].role == "ROLE_ADMIN") {
          Swal.fire({
            title: 'Bienvenue admin ' + data.user.username,
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Accèder en tant qu'administrateur",
            denyButtonText: "Accèder en tant que client",
          }).then((result) => {
            if (result.isConfirmed) {
              this.route.navigate(["admindashboard"]);
            } else if (result.isDenied) {
              this.route.navigate(["home"]);
            } else {
              this.route.navigate(["login"]);

            }

          })
        } else {
          Swal.fire('Bienvenue ' + data.user.username)
          this.route.navigate(["home"]);
        }


        console.log(data);
      },
      error: (err: any) => {
        console.error('API Error:', err);
      },
      complete: () => { }
    })

  }
  /* signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then(
      data => {
        console.log(data);
      }
    )
  } */


  //googleSignIn
  ngOnInit() {
    /* this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
      console.log(user)
    });
 */
    this.credentialForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(3)]]
    });
  }
 

  async signIn(){
    this.chatService.signIn(this.credentialForm.value).then(res => {
      this.route.navigateByUrl('/home', {replaceUrl: true});
    }, async err => {
      console.log(err)
      Swal.fire({
        title: 'Mot de passe oublié ?',
        icon: 'warning',
        html:
          'Vous pouvez ' +
          '<a href="/forgotpassword">réinitialiser votre mot de passe!</a> ',
          
        showCloseButton: false,
        showCancelButton: false,
        focusConfirm: false,
      })
      this.attempts+=1;
      if(this.attempts==3){
      this.route.navigateByUrl('/forgotpassword')
      }
    });
  }

  sendVerifEmail(user: any){
    user.sendVerificationEmail().then((res : any ) => {
      this.route.navigate(['/verifyemail']);
    }, (err: any) => {
      alert("une erreur s'est produite")
    })
  
  }
  //for easier access
  get email(){
    return this.credentialForm.get('email');
  }
  get password(){
    return this.credentialForm.get('password');
  }

}
