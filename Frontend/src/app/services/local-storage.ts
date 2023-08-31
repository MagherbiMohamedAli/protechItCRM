import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { User } from "../Model/user";
import jwt_decode from 'jwt-decode';
import { Role } from "../Model/Role";

const USER_ID_KEY = 'AuthUserId';
const AUTHORITIES_KEY = 'AuthAuthorities';
const USER_KEY = 'AuthUser';
const TOKEN_KEY = 'AuthToken';
const USERNAME_KEY = 'AuthUsername';


@Injectable({
    providedIn: 'root'
})

export class LocalStorage {
    private roles: Array<string> = [];
    constructor(private route: Router){}

Signout(){
    localStorage.clear();
    this.route.navigate(['']);
}


public getToken(): string{
    return localStorage.getItem(TOKEN_KEY)!;
}

public saveToken(token: string){
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.setItem(TOKEN_KEY, token);
}



public getUsername(): string {
    return localStorage.getItem(USERNAME_KEY)!;
}

public saveUsername(username: string){
    window.localStorage.removeItem(USERNAME_KEY);
    window.localStorage.setItem(USERNAME_KEY, username);
}


public getUserId(): number{
    return Number(localStorage.getItem(USER_ID_KEY)!);
}
public saveUserId(userId: number){
    window.localStorage.removeItem(USER_ID_KEY);
    window.localStorage.setItem(USER_ID_KEY, userId.toString());
}

public getUser(): any{
    return JSON.parse(localStorage.getItem(USER_KEY)!);
}

public saveUser(user: User): void{
    window.localStorage.removeItem(USER_KEY);
    window.localStorage.setItem(USER_KEY, JSON.stringify(user));
}

public getAuthorities(){
    return JSON.parse(localStorage.getItem(AUTHORITIES_KEY)!);
}

public saveAuthorities(authorities: any){
    window.localStorage.removeItem(AUTHORITIES_KEY);
    window.localStorage.setItem(AUTHORITIES_KEY, JSON.stringify(authorities));
}

public isLoggedIn(){
    return !!this.getToken();
}

isTokenExpired(): boolean{
    const token = this.getToken();
    if (token !== undefined){
        const decoded: any = jwt_decode(token);
        if (decoded.exp === undefined) {
            console.log('decoded.exp undefined');
            return false;
        }

        const date = new Date(0);
        const tokenExpDate = date.setUTCSeconds(decoded.exp);
        if (tokenExpDate.valueOf() > new Date().valueOf()) {
            return true;
        } else {
            window.localStorage.clear();
            console.log('localStorage clear');
            return false;
        }

    } else {
        return false;
    
    }
}
}
