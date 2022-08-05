import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ACCESS_TOKEN, USER_LOGIN } from '../util/config';

@Injectable()
export class httpApiInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let tokenAuthorization: string | null = '';

    if (localStorage.getItem(USER_LOGIN)) {
      tokenAuthorization = localStorage.getItem(ACCESS_TOKEN)
    }

    const autRequest = req.clone({
      headers: new HttpHeaders({
        'token': tokenAuthorization
      })
    })
    return next.handle(autRequest);
  }
}
