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

  details(id: string): Observable<TranslationModel> {
    const observerTranslations = new Observable<TranslationModel>((observer) => {
      var translation: TranslationModel = null;

      // Retrieves translation
      super.get('/api/' + id).subscribe({
        next: (v) => {
          translation = v;

          // Retrieves translation mapping
          this.mappingDetails(id).subscribe({
            next: (v2) => { translation.body = v2; observer.next(translation); },
            error: (e2) => observer.error('Translation was found but not it mapping (error: ' + JSON.stringify(e2) + ')')
          });

        },
        error: (e) => observer.error('Translation not found (' + JSON.stringify(e) + ')')
      });
    });

    return observerTranslations;
  }

  add(data: TranslationModel): Observable<any> {
    return super.post('/api/' + data.id, data.body, this.textHeaders);
  }

  remove(data: TranslationModel): void {
    super.delete('/api/' + data.id);
  }

  mappingDetails(id: string): Observable<any> {
    return super.get('/api/' + id + '/mapping', this.textHeaders);
  }

  dataValue(id: string): Observable<any> {
    return super.get('/api/' + id + '/data', this.textHeaders);
  }

}
