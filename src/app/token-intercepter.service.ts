import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TokenIntercepterService implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {

    if (this.canAppendAccessToken(req)) {
      req = req.clone({
        setHeaders: {
          'access_token': localStorage.getItem('loginToken') || ''
        }
      })

    }
    return next.handle(req);
  }

  canAppendAccessToken(req) {
    return req.url.includes('/do_vote');
  }

}
