import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../Model/user';
import { LoginRequest } from '../Model/login-request';
import { UsersService } from './users.service';
import { LocalStorage } from './local-storage';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
const URL = "http://localhost:8080/api/Auth";
@Injectable({
  providedIn: 'root'
})
export class AuthentificationService implements OnInit {
  credentialForm!: FormGroup;

  private userRolesSubject: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);


  constructor(private http: HttpClient, private fb: FormBuilder, private afAuth: AngularFireAuth, private fireauth: AngularFireAuth, private userService: UsersService, private localSt: LocalStorage, private route: Router) {
    if (this.localSt.isLoggedIn()) {
      this.loadUserRoles();
    }
  }
  ngOnInit() {
    this.credentialForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  private loadUserRoles() {
    this.userService.getUserById(this.localSt.getUserId()).subscribe({
      next: (data: any) => {
        const roles = data.roles.map((r: any) => r.role);
        this.userRolesSubject.next(roles);
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }


  getUserRoles(): Observable<string[]> {
    console.log(this.userRolesSubject.value);
    return this.userRolesSubject.asObservable();

  }

  
  forgotpwd(passwordResetEmail: string) {
    return this.afAuth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Email de réinitialisation est envoyé, vérifier votre boite de réception!');
      })
      .catch((error) => {
        window.alert(error);
      });

  }
  get email() {
    return this.credentialForm.get('email');
  }

  inscriptionclient(user: User): Observable<User> {
    return this.http.post<User>(URL + "/signup", user)
  }


  loginclient(loginReq: LoginRequest): Observable<User> {

    return this.http.post<User>(URL + "/Connexion", loginReq)
  }

}
