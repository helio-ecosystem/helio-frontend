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

  addComponent(component: ComponentModel): Observable<ComponentModel> {
    console.log(component);
    console.log(component.toJson());
    return super.post('/component', component.toJson());
  }

  deleteComponent(componentId: string): Observable<any> {
    return super.delete('/component/' + componentId);
  }

}
