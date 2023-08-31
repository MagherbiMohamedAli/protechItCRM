import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../Model/user';
import Swal from 'sweetalert2';
import { AuthentificationService } from '../services/authentification.service';
import { HttpClient } from '@angular/common/http';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChatService } from '../services/chat/chat-service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  user: User = new User();
  credentialForm!: FormGroup;

  constructor(private auth: AuthentificationService, private route: Router, private http: HttpClient,
    private afAuth: AngularFireAuth, private afs: AngularFirestore, private fb: FormBuilder, private chtSer: ChatService

  ) { }
  ngOnInit() {
    this.credentialForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      birthday: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  inscrit(form: any) {
    console.log(this.credentialForm.value)
    const username = this.credentialForm.get('username')?.value;
    const email = this.credentialForm.get('email')?.value;
    const birthday = this.credentialForm.get('birthday')?.value;
    const password = this.credentialForm.get('password')?.value;
    
    this.chtSer.signUp(username, email, birthday, password).then((uid: string) => {
     
      this.auth.inscriptionclient(this.credentialForm.value).subscribe({
        next: (data: any) => {
          console.log(data);
        },
        error: (err: any) => {
          console.error('API Error:', err);
        },
        complete: () => { }
      })


      Swal.fire({
        icon: 'success',
        title: 'Bienvenue!',
        text: 'Bienvenue dans la communauté de PROTECH-IT',
      });
      console.log(uid);
      this.route.navigate(['home']);
    }).catch((error: any) => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Erreur dans un ou plusieurs champs du formulaire',
      });
      console.log(error);

    });

  }
  get email() {
    return this.credentialForm.get('email');
  }
  get password() {
    return this.credentialForm.get('password');
  }
  get birthday() {
    return this.credentialForm.get('birthday');
  }
  get username() {
    return this.credentialForm.get('username');
  }


}
