import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ModeValue } from '../shared/mode-value';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  public static APP_VERSION = 'v0.1.4';
  private mode: string;
  private subjectOnChangeSection: Subject<string> = new Subject<string>();

  constructor(private config: ConfigService) {
    var conf = this.config.readConfig();
    if (conf.mode && conf.mode.toLowerCase() == ModeValue.PLAYGROUND.toLowerCase()) {
      this.mode = ModeValue.PLAYGROUND;
    }
    else {
      this.mode = ModeValue.APP;
    }
  }

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
