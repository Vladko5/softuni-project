import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable, Provider } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()

export class PathInterceptorService implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (!req.url.includes('http')) {
      req = req.clone({
        url:'http://localhost:3000/api'+req.url
      });
    }
    console.log(this);

    return next.handle(req)
  }
}

export const pathInterceptorProvider:Provider={
  provide: HTTP_INTERCEPTORS,
  useClass: PathInterceptorService,
  multi:true
}