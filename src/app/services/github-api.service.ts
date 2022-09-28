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
  
  private headers: Object = {
    headers: new HttpHeaders({})
  };

  private headersContentFile: Object = {
    headers: new HttpHeaders({
      Accept: 'application/vnd.github.VERSION.raw'
    })
  };

  private headersMarkdownFile: Object = {
    headers: new HttpHeaders({
      Accept: 'application/vnd.github.VERSION.html'
    }),
    responseType: 'text'
  }
  
  constructor(private http: HttpClient) { }

  repositoryMarkdown(): Observable<any> {
    return this.http.get(this.host + 'contents/README.md' + this.query, this.headersMarkdownFile);
  }

  repositoryFileTree(): Observable<any> {
    return this.http.get(this.host + 'git/trees/' + this.branch + '?recursive=1', this.headers);
  }

  contentFile(filepath: string): Observable<any> {
    return new Observable(observable => {
      this.http.get(this.host + 'contents/' + filepath + this.query, this.headersContentFile).subscribe({
        next: (v) => {
          observable.next(v);
        },
        error: (e) => observable.error(e),
        complete: () => observable.complete()
      });
    }); 
  }

}
