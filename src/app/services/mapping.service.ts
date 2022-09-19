import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RestService } from './rest.service';
import { MappingModel } from "../models/mapping";

@Injectable({
  providedIn: 'root'
})
export class MappingService extends RestService {

  list(): Observable<MappingModel[]> {
    return super.get('/api');
  }

  details(id: string): Observable<MappingModel> {
    const observerMappings = new Observable<MappingModel>((observer) => {
      var mapping: MappingModel = null;

      // Retrieves mapping
      super.get('/api/' + id).subscribe({
        next: (v) => {
          mapping = v;

          // Retrieves mapping details
          this.mappingDetails(id).subscribe({
            next: (v2) => { mapping.body = v2; observer.next(mapping); },
            error: (e2) => observer.error('Mapping was found but not it details (error: ' + JSON.stringify(e2) + ')')
          });

        },
        error: (e) => observer.error('Mapping not found (' + JSON.stringify(e) + ')')
      });
    });

    return observerMappings;
  }

  add(data: MappingModel): Observable<any> {
    return super.post('/api/' + data.id + '?builder=' + data.mappingProcessor, data.body, this.textHeaders);
  }

  remove(id: string): Observable<any> {
    return super.delete('/api/' + id);
  }

  mappingDetails(id: string): Observable<any> {
    return super.get('/api/' + id + '/mapping', this.textHeaders);
  }

  dataValue(id: string): Observable<any> {
    return super.get('/api/' + id + '/data', this.textHeaders);
  }

}
