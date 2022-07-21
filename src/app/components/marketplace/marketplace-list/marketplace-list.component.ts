import { Component, OnInit } from '@angular/core';
import {ComponentModel} from "../../../models/component";
import {SettingsService} from "../../../services/settings.service";
import {ComponentService} from "../../../services/component.service";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {MarketplaceFormDialogComponent} from "../marketplace-form-dialog/marketplace-form-dialog.component";
import { types, iconTypes } from '../component-types';

@Component({
  templateUrl: './marketplace-list.component.html',
  styleUrls: ['./marketplace-list.component.css']
})
export class MarketplaceListComponent {

  componentTypes = types;
  iconTypes = iconTypes;

  componentsInstalled: ComponentModel[];
  componentsAvailable: ComponentModel[];
  rowData: any[];
  error: string;
  hover: string = '';

  notification;

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
    dialogRef.afterClosed().subscribe((newComponent: ComponentModel) => {
      if (newComponent) {
        this.componentsInstalled.push(newComponent);
        this.addTemporalNotification('Installed component ' + newComponent.name + ' successfuly!');
      }
    });
  }

  private addTemporalNotification(msg) {
    this.notification = { type: 'success', data: msg };
    setTimeout(() => this.notification = null, 10000);
  }

}
