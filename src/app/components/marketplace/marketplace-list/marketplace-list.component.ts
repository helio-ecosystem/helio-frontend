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
  }

  private toTableData(sourceData: any[]) {
    sourceData.forEach(s => {
      var d: ComponentModel = new ComponentModel(JSON.parse(JSON.stringify(s)));
      this.rowData.push([d.getName(), d.getClazz(), d.getType(), d.getSource()]);
    });
  }







}
