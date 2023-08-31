import { HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { LocalStorage } from "../local-storage";
import { Observable } from "rxjs";

const TOKEN_HEADER_KEY = 'Authorization';
@Injectable()
export class Interceptor implements HttpInterceptor {
    constructor(private localStorageService: LocalStorage){

    }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let authReq = req;
        const token = this.localStorageService.getToken();
        if (token != null){
            authReq = req.clone({headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token)});

        }
        return next.handle(authReq);
    }
}
export const authInterceptorProviders= [
    {provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true}
];
