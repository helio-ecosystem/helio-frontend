import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  protected host: string = environment.host;

  protected jsonHeaders = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
      Pragma: 'no-cache'
    })
  };

  protected textHeaders = {
    headers: new HttpHeaders({
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'no-cache',
      Pragma: 'no-cache'
    })
  };

  constructor(protected http: HttpClient) { }

  protected get(uri: string, headers?): Observable<any> {
    return this.http.get(this.host + uri, headers != null ? headers : this.jsonHeaders);
  }

  protected post(uri: string, data: any, headers?): Observable<any> {
    return this.http.post(this.host + uri, data, headers != null ? headers : this.jsonHeaders);
  }

  protected put(uri: string, data: any, headers?): Observable<any> {
    return this.http.put(this.host + uri, data, headers != null ? headers : this.jsonHeaders);
  }

  protected delete(uri: string, headers?): Observable<any> {
    return this.http.delete(this.host + uri, headers != null ? headers : this.jsonHeaders);
  }

}
