import { Component } from '@angular/core';
import {SettingsService} from "../../../services/settings.service";
import {TranslationModel} from "../../../models/translation";
import {TranslationService} from "../../../services/translation.service";

@Component({
  selector: 'app-translation-list',
  templateUrl: './translation-list.component.html',
  styleUrls: ['./translation-list.component.css']
})
export class TranslationListComponent {

  columns = ['id'];
  data;
  error: string = '';

  constructor(private settings: SettingsService, private service: TranslationService) {
    this.settings.setSection('Translation list');
    this.search();
  }

  search() {
    this.error = '';
    this.service.list().subscribe({
      next: (v) => this.toTableData(v),
      error: (e) => this.error = 'Cannot retrieve translation list'
    });
  }

  private toTableData(sourceData: any[]) {
    this.data = [];
    sourceData.forEach(s => {
      var d: TranslationModel = new TranslationModel(JSON.parse(JSON.stringify(s)));
      this.data.push([d.getId()]);
    });
  }
}
