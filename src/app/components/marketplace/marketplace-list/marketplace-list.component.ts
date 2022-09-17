import { Component } from '@angular/core';
import { ComponentModel } from "../../../models/component";
import { SettingsService } from "../../../services/settings.service";
import { ComponentService } from "../../../services/component.service";
import { MatDialog } from "@angular/material/dialog";
import { MarketplaceFormDialogComponent } from "../marketplace-form-dialog/marketplace-form-dialog.component";
import { types, iconTypes } from '../../../shared/component-types';
import { SecurityService } from 'src/app/services/security.service';
import { MarketplaceModule } from '../marketplace.module';
import { MarketplaceDeleteDialogComponent } from '../marketplace-delete-dialog/marketplace-delete-dialog.component';

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
    private security: SecurityService,
    private settings: SettingsService,
    private service: ComponentService,
    private dialog: MatDialog)
  {
    this.security.redirectIfSectionUnavailable(MarketplaceModule.section);
    this.settings.setSection(MarketplaceModule.section);
    this.search();
  }

  search() {
    this.componentsInstalled = [];
    this.componentsAvailable = [];
    this.rowData = [];
    this.error = null;
    this.service.list().subscribe({
      next: (v) => this.componentsInstalled = v,
      error: (e) => this.error = 'Cannot retrieve components installed. Try again with refresh button.'
    });
  }

  create() {
    const dialogRef = this.dialog.open(MarketplaceFormDialogComponent);
    dialogRef.afterClosed().subscribe((newComponent: ComponentModel) => {
      if (newComponent) {
        this.addTemporalNotification('Installed component ' + newComponent.name + ' successfuly!');
        this.search(); // Invoke 'search' to get components Ids
      }
    });
  }


  deleteComponent(component: ComponentModel) {
    const dialogRef = this.dialog.open(MarketplaceDeleteDialogComponent, { data: component });
    dialogRef.afterClosed().subscribe(result => {
      if (result && result.status == 'ok') {
        this.componentsInstalled = this.componentsInstalled.filter(p => p.name != component.name && p.clazz != component.clazz && p.source != component.source);
        this.addTemporalNotification('Component ' + component.name + ' deleted successfuly!');
      }
      else if (result && result.status == 'error') {
        this.addTemporalErrorNotification('Error when deleted component ' + component.name + '');
      }
    });
  }


  private addTemporalNotification(msg) {
    this.notification = { type: 'success', data: msg };
    setTimeout(() => this.notification = null, 10000);
  }

  private addTemporalErrorNotification(msg) {
    this.notification = { type: 'error', data: msg };
    setTimeout(() => this.notification = null, 10000);
  }

}
