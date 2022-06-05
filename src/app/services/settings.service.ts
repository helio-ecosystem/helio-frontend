import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private subjectOnChangeSection: Subject<string> = new Subject<string>();

  onChangeSection(): Observable<string> {
    return this.subjectOnChangeSection;
  }

  setSection(title: string): void {
    this.subjectOnChangeSection.next(title);
  }

}
