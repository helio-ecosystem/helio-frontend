import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private TIME_REFRESH = 10 * 60 * 1000;

  constructor() {}

  public isLoaded() {
    return localStorage.getItem('loaded') && !this.needRefresh();
  }

  public setLoaded() {
    localStorage.setItem('loaded', 'true');
    localStorage.setItem('refresh', (Date.now() + this.TIME_REFRESH) + "");
  }

  private needRefresh() {
    var refresh = localStorage.getItem('refresh');
    return refresh ? Date.now() > parseInt(refresh) : false;
  }

}
