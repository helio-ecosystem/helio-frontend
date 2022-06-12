import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RestService } from './rest.service';
import { ComponentModel } from '../models/component';
import {TranslationModel} from "../models/translation";

@Injectable({
  providedIn: 'root'
})
export class ComponentService extends RestService {

  list(): Observable<ComponentModel[]> {
    return super.get('/component');
  }

}
