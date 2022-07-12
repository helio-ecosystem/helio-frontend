import { Component } from '@angular/core';
import {SettingsService} from "../../../services/settings.service";
import {TranslationModel} from "../../../models/translation";
import {TranslationService} from "../../../services/translation.service";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {TranslationFormDialogComponent} from "../translation-form-dialog/translation-form-dialog.component";
import { TourService } from 'src/app/services/tour.service';

@Component({
  selector: 'app-translation-list',
  templateUrl: './translation-list.component.html',
  styleUrls: ['./translation-list.component.css']
})
export class TranslationListComponent {

  columns = ['id', 'processor', 'threads assigned'];
  data;
  error: string = '';
  notification = null;

  constructor(
    private settings: SettingsService,
    private service: TranslationService,
    private router: Router,
    private dialog: MatDialog)
  {
    this.settings.setSection('Translation');
    this.search();
  }

  search() {
    this.error = '';
    this.service.list().subscribe({
      next: (v) => this.toTableData(v),
      error: (e) => this.error = 'Error: Cannot retrieve translation list. Try again with refresh button.'
    });
  }


  create() {
    const dialogRef = this.dialog.open(TranslationFormDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        var dataValue = JSON.parse(result);
        this.addRowInTable(dataValue);
        this.addTemporalNotification('Translation "' + dataValue.id + '" added correctly.');
      }
    });
  }

  private addTemporalNotification(msg) {
    this.notification = msg;
    setTimeout(() => this.notification = null, 10000);
  }


  private toTableData(sourceData: any[]) {
    this.data = [];
    sourceData.forEach(s => this.addRowInTable(s));
  }

  private addRowInTable(newData) {
    var d: TranslationModel = new TranslationModel(JSON.parse(JSON.stringify(newData)));
    if (d.id && d.id != TourService.playground_translation_id) {
      this.data.push([d.id, d.mappingProcessor, d.threads]);
    }
    else if (newData.id && newData.id != TourService.playground_translation_id) {
      console.log(newData);
      this.data.push([newData.id, newData.mappingProcessor, newData.threads]);
    }
  }

  rowSelected(row: any[]): void {
    var selected = row[0];
    console.log("Row clicked! " + selected);
    this.router.navigate(['/translations/details/' + selected]);
  }

}
