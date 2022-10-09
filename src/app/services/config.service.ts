import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ModeValue } from '../shared/mode-value';
import { environment } from 'src/environments/environment';
import { AppConfigModel } from '../models/app-config';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  private configuration: AppConfigModel;

  constructor(private httpClient: HttpClient) { }

  setConfig(): Promise<AppConfigModel> {
    return this.httpClient
      .get<AppConfigModel>('./assets/config.json')
      .toPromise()
      .then(config => this.configuration = config);
  }

  readConfig(): AppConfigModel {
    return this.configuration;
  }

}
