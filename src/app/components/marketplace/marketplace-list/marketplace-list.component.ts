import { Component, OnInit } from '@angular/core';
import {ComponentModel} from "../../../models/component";
import {SettingsService} from "../../../services/settings.service";
import {ComponentService} from "../../../services/component.service";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {MarketplaceFormDialogComponent} from "../marketplace-form-dialog/marketplace-form-dialog.component";

@Component({
  templateUrl: './marketplace-list.component.html',
  styleUrls: ['./marketplace-list.component.css']
})
export class MarketplaceListComponent {

  componentsInstalled: ComponentModel[];
  componentsAvailable: ComponentModel[];
  rowData: any[];
  error: string;
  hover: string = '';

  constructor(
    private settings: SettingsService,
    private service: ComponentService,
    private dialog: MatDialog)
  {
    this.settings.setSection('Marketplace');
    this.search();
  }

  search() {
    this.componentsInstalled = [];
    this.componentsAvailable = [];
    this.rowData = [];
    this.error = null;

    this.service.list().subscribe({
      next: (v) => v.forEach(item => this.componentsInstalled.push(new ComponentModel(item)) ),
      error: (e) => this.error = 'Cannot retrieve components installed. Try again with refresh button.'
    });

    //this.componentsInstalled = this.dummy;
  }

  create() {
    const dialogRef = this.dialog.open(MarketplaceFormDialogComponent);
    dialogRef.afterClosed().subscribe(() => console.log('Dialogo cerrado'));
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
