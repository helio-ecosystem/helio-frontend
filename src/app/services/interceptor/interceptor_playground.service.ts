import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class InterceptorPlaygroundService implements HttpInterceptor  {

  static allOptionsMenu = false;

  constructor(private router: Router) { }

  private sectionsAvailable = ['home', 'playground', 'tour'];

  public intercept(request: HttpRequest<any>, next: HttpHandler) {
    var currentSection = request.url.match('[^\/]+:\/\/[^\/]+\/([^\/]+).*')[1];

    if (!this.sectionsAvailable.find(section => section == currentSection)) {
      this.router.navigate(['/home']);
    }

    return next.handle(request);
  }

}
