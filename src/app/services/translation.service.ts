import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RestService } from './rest.service';
import { TranslationModel } from "../models/translation";

@Injectable({
  providedIn: 'root'
})
export class TranslationService extends RestService {

  list(): Observable<TranslationModel[]> {
    return super.get('/api');
  }

  add(data: TranslationModel): void {
    super.post('/api/' + data.getId(), data.getBody());
  }

  remove(data: TranslationModel): void {
    super.delete('/api/' + data.getId());
  }

  mappingDetails(id: string): Observable<TranslationModel> {
    return super.get('/api/' + id + '/mapping');
  }

  dataValue(id: string): Observable<any> {
    return super.get('/api/' + id + '/data');
  }

}
