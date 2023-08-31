import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LocalStorage } from '../services/local-storage';
import { AuthentificationService } from '../services/authentification.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  role :any;
  constructor(private localStor: LocalStorage, private router: Router, private authService: AuthentificationService) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      this.role=this.localStor.getAuthorities();
      if (this.localStor.isLoggedIn() && this.localStor.isTokenExpired()
       && this.role[0].role=="ROLE_ADMIN") {
        return true;
    } else {
        this.router.navigate(['']);
        return false;
    }
    }
  
}
