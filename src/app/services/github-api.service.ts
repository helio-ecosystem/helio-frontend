import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TutorialModel } from '../models/tutorial';

@Injectable({
  providedIn: 'root'
})
export class GitHubApiService {

  private repository = 'EmilioCrespoPeran/sample/'; 
  private host = 'https://api.github.com/repos/' + this.repository;
  private branch = 'main';
  
  private query = '?ref=' + this.branch;
  
  private headers = {
    headers: new HttpHeaders({})
  };

  private headersContentFile = {
    headers: new HttpHeaders({
      Accept: 'application/vnd.github.VERSION.raw'
    })
  };

  constructor(private http: HttpClient) { }

  repositoryFileTree(): Observable<any> {
    return this.http.get(this.host + 'git/trees/' + this.branch + '?recursive=1', this.headers);
  }

  contentFile(filepath: string): Observable<any> {
    return new Observable(observable => {
      this.http.get(this.host + 'contents/' + filepath + this.query, this.headersContentFile).subscribe({
        next: (v) => {
          var raw = JSON.parse(JSON.stringify(v));
          var model = new TutorialModel(raw);
          observable.next(model);
        },
        error: (e) => observable.error(e),
        complete: () => observable.complete()
      });
    }); 
  }

}
