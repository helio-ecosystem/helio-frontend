import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
/**
 * This interceptor is disabled for production purpose.
 */
export class InterceptorDisabledService implements HttpInterceptor {

  static allOptionsMenu = true;

  public intercept(request: HttpRequest<any>, next: HttpHandler) {
    return next.handle(request);
  }

}
