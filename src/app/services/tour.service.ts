import { Injectable } from '@angular/core';
import { GitHubApiService } from './github-api.service';
import { Observable } from 'rxjs';
import { TutorialSection } from '../models/tutorial-section';
import { TutorialModel } from '../models/tutorial';
import showdown from 'showdown';

@Injectable({
  providedIn: 'root'
})
export class TourService {
  
  // Relative path in repository to tours folder
  // It's important to end with slash
  private BASE_PATH = 'tour/';
  private DIR_TYPE = 'tree';
  private FILE_TYPE = 'blob';

  private markdownConversor;

  constructor(private github: GitHubApiService) {
    this.markdownConversor = new showdown.Converter();
  }


  tourDirectory(): Observable<TutorialSection[]> {
    return new Observable<any>(observable => {
      this.github.repositoryFileTree().subscribe({
        next: (files) => {
          try {
            var tutorialSections: TutorialSection[] = [];
            files['tree'].forEach(file => {
              var isInPath = file['path'].startsWith(this.BASE_PATH);
              var oneDeepLevelDir = isInPath && file['type'] == this.DIR_TYPE 
                && file['path'].replace(this.BASE_PATH, '').split('/').length == 0;
              var oneDeepLevelFile = isInPath && file['type'] == this.FILE_TYPE
                && file['path'].replace(this.BASE_PATH, '').split('/').length == 2;

              // Only we manage one-level-deep
              if (oneDeepLevelDir) {
                  var item = new TutorialSection();
                  item.name = this.removeSpecialChars(file['path'].replace(this.BASE_PATH, ''));
                  tutorialSections.push(item);
              }
              else if (oneDeepLevelFile) {
                  var relativePath = file['path'].replace(this.BASE_PATH, '').split('/');
                  var parentName = this.removeSpecialChars(relativePath[0]);
                  var childName = this.removeSpecialChars(relativePath[1]).replace('.json', '');

                  var child = new TutorialSection();
                  child.name = childName;
                  child.path = relativePath[0] + '/' + relativePath[1].replace('.json', '');

                  var parentIndex = tutorialSections.findIndex(t => t.name === parentName);
                  if (parentIndex != -1) {
                    tutorialSections[parentIndex].addChild(child);
                  }
                  else {
                      var parent = new TutorialSection();
                      parent.name = parentName;
                      parent.addChild(child);
                      tutorialSections.push(parent);
                  }
              }

            });
            observable.next(tutorialSections);
          }
          catch(error) {
            observable.error(error);
          }
        },
        error: (e) => observable.error(e),
        complete: () => observable.complete()
      });
    });
  }


  tutorialContent(path: string): Observable<TutorialModel> {
    return new Observable<TutorialModel>(observable => {
      this.github.contentFile(this.BASE_PATH + path).subscribe({
        next: (v) => {
          var model = new TutorialModel(JSON.parse(JSON.stringify(v)));
          // Transform markdown text to html
          model.description = this.markdownConversor.makeHtml(model.description);
          observable.next(model);
        },
        error: (e) => observable.error(e),
        complete: () => observable.complete()
      });
    });
  }

  removeSpecialChars(value: string): string {
    return value.replace('_', ' ').replace('-', ' ');
  }

}
