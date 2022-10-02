import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { ComponentModel } from '../models/component';
import { GitHubApiService } from './github-api.service';
import { SettingsService } from './settings.service';
import { ComponentService } from './component.service';
import { environment } from 'src/environments/environment';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class MarketplaceService {

  private defaultPath = 'config/components.json';

  constructor(
    private storage: StorageService,
    private github: GitHubApiService,
    private settings: SettingsService,
    private components: ComponentService)
  {
    if (this.settings.isPlaygroundMode() && !this.storage.isLoaded()) {
      this.storage.setLoaded();
      let componentsInstalled = this.components.list();
      let componentsDescribed = this.github.contentFile(this.defaultPath)

      // Waits until two observables publish their data
      forkJoin([componentsInstalled, componentsDescribed])
        .subscribe(data => this.loadComponentsForPlaygroundMode(data[0], data[1]));
    }
  }


  private loadComponentsForPlaygroundMode(componentsInstalled: ComponentModel[], componentsDescribed: any[]) {
    componentsDescribed = componentsDescribed.map(c => 
      new ComponentModel({id: null, clazz: c['clazz'], source: c['source'], type: c['type']}));

    let isSameComponent = (installed: ComponentModel, described: ComponentModel) => {
      return installed.clazz === described.clazz && installed.type === described.type;
    };
    let getLastElement = (element: any[]) => { 
      return element[element.length - 1];
    };
    let needToReplaceComponent = (installed: ComponentModel, described: ComponentModel) => {
      let libraryInstalled = getLastElement(installed.source.split('/'));
      let libraryDescribed = getLastElement(described.source.split('/'));
      return libraryInstalled !== libraryDescribed;
    };

    let componentsToInstall: ComponentModel[] = [];

    componentsDescribed.forEach(component => {
      let componentInstalled = componentsInstalled.find(c => isSameComponent(c, component));

      if (!componentInstalled || (componentInstalled && needToReplaceComponent(componentInstalled, component))) {
        componentsToInstall.push(component);
      }
      else if (componentInstalled) {
        componentsInstalled = componentsInstalled.filter(c => c.id !== componentInstalled.id);
      }
    });

    forkJoin(
      componentsToInstall.map(c => this.components.addComponent(c)).concat(
      componentsInstalled.map(c => this.components.deleteComponent(c.id)))
      ).subscribe(data => {});
  }

}
