import { isPlatformBrowser } from '@angular/common';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(@Inject(PLATFORM_ID) private plataformId:Object) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token:string  


    if(isPlatformBrowser(this.plataformId)){
      token= localStorage.getItem('token');
    }
    if (token) {
      const clonedRequest = req.clone({
        setHeaders: {
          Authorization: token
        }
      });
      return next.handle(clonedRequest);  
    }

    return next.handle(req);
  }



}
