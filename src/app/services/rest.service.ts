import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  protected host: string = environment.host;

  protected httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
      Pragma: 'no-cache'
    })
  };

  constructor(protected http: HttpClient) { }

  protected get(uri: string): Observable<any> {
    return this.http.get(this.host + uri, this.httpOptions);
  }

  protected post(uri: string, data: any): Observable<any> {
    return this.http.post(this.host + uri, data, this.httpOptions);
  }

  protected put(uri: string, data: any): Observable<any> {
    return this.http.put(this.host + uri, data, this.httpOptions);
  }

  protected delete(uri: string): Observable<any> {
    return this.http.delete(this.host + uri);
  }

}
