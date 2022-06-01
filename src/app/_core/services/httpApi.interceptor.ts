import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ACCESS_TOKEN, TOKEN_CYBERSOFT, USER_LOGIN } from '../util/config';

@Injectable()
export class httpApiInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let tokenCybersoft = TOKEN_CYBERSOFT;
    let tokenAuthorization: string | null = '';

    if (localStorage.getItem(USER_LOGIN)) {
      tokenAuthorization = localStorage.getItem(ACCESS_TOKEN)
    }

    const autRequest = req.clone({
      headers: new HttpHeaders({
        'token': tokenAuthorization,
        'tokenByClass': tokenCybersoft
      })
    })
    return next.handle(autRequest);
  }
}
