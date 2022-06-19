import { Component, OnInit } from '@angular/core';
import {ComponentModel} from "../../../models/component";
import {SettingsService} from "../../../services/settings.service";
import {ComponentService} from "../../../services/component.service";

@Component({
  templateUrl: './marketplace-list.component.html',
  styleUrls: ['./marketplace-list.component.css']
})
export class MarketplaceListComponent {

  componentsInstalled: ComponentModel[];
  componentsAvailable: ComponentModel[];
  columnsRows = ['name', 'class', 'type', 'source'];
  rowData: any[];
  error: string;
  hover: string = '';

  constructor(private settings: SettingsService, private service: ComponentService) {
    this.settings.setSection('Marketplace');
    this.search();
  }

  search() {
    this.componentsInstalled = [];
    this.componentsAvailable = [];
    this.rowData = [];
    this.error = null;

    this.service.list().subscribe({
      next: (v) => { this.componentsInstalled = v; this.toTableData(v); },
      error: (e) => this.error = 'Cannot retrieve components installed'
    });

    this.componentsInstalled = this.dummy;
    this.toTableData(this.dummy);
  }

  private toTableData(sourceData: any[]) {
    sourceData.forEach(s => {
      var d: ComponentModel = new ComponentModel(JSON.parse(JSON.stringify(s)));
      this.rowData.push([d.getName(), d.getClazz(), d.getType(), d.getSource()]);
    });
  }




  dummy: ComponentModel [] = [
    new ComponentModel({
      "source": "https://github.com/helio-ecosystem/helio-provider-url/releases/download/v0.1.0/helio-provider-url-0.1.0.jar",
      "clazz": "provider.URLProvider",
      "type": "PROVIDER"
    }),
    new ComponentModel({
      "source": "https://github.com/helio-ecosystem/helio-provider-files/releases/download/v0.1.1/helio-provider-files-0.1.1.jar",
      "clazz": "helio.providers.files.FileProvider",
      "type": "PROVIDER"
    }),
    new ComponentModel({
      "source": "https://github.com/helio-ecosystem/helio-provider-files/releases/download/v0.1.1/helio-provider-files-0.1.1.jar",
      "clazz": "helio.providers.files.FileWatcherProvider",
      "type": "PROVIDER"
    }),
    new ComponentModel({
      "source": "https://github.com/helio-ecosystem/helio-builder-jld11map/releases/download/v0.1.6/helio-builder-jld11map-0.1.6.jar",
      "clazz": "helio.builder.jld11map.JLD11Builder",
      "type": "BUILDER"
    }),
    new ComponentModel({
      "source": "https://github.com/helio-ecosystem/helio-handler-jayway/releases/download/v0.1.1/helio-handler-jayway-0.1.1.jar",
      "clazz": "handlers.JsonHandler",
      "type": "HANDLER"
    })
  ];




}
