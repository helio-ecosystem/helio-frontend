import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ModeValue } from '../shared/mode-value';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  public static APP_VERSION = 'v0.1.0';
  private mode = environment.mode;

  private subjectOnChangeSection: Subject<string> = new Subject<string>();

  isPlaygroundMode() {
    return this.mode == ModeValue.PLAYGROUND;
  }

  isApplicationMode() {
    return this.mode == ModeValue.APP;
  }

  onChangeSection(): Observable<string> {
    return this.subjectOnChangeSection;
  }

  setSection(title: string): void {
    this.subjectOnChangeSection.next(title);
  }

}
