import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { RestService } from './rest.service';
import { ComponentModel } from '../models/component';

@Injectable({
  providedIn: 'root'
})
export class HelioService extends RestService {

  componentList(): Observable<ComponentModel[]> {
    return super.get('/component');
  }

}
