import { Component } from '@angular/core';
import {SettingsService} from "../../../services/settings.service";
import {TranslationModel} from "../../../models/translation";
import {TranslationService} from "../../../services/translation.service";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {TranslationFormDialogComponent} from "../translation-form-dialog/translation-form-dialog.component";
import { TourService } from 'src/app/services/tour.service';
import { RowActionModel } from 'src/app/models/row-action';
import { RowResponseModel } from 'src/app/models/row-action response';
import { TranslationDeteleDialogComponent } from '../translation-detele-dialog/translation-detele-dialog.component';

@Component({
  selector: 'app-translation-list',
  templateUrl: './translation-list.component.html',
  styleUrls: ['./translation-list.component.css']
})
export class TranslationListComponent {

  columns = ['# id', 'processor', 'threads assigned'];
  rowActions = [
    new RowActionModel({
      clazz: 'info-btn',
      event: 'edit',
      icon: 'edit'
    }),
    new RowActionModel({
      clazz: 'danger-btn',
      event: 'delete',
      icon: 'delete'
    })
  ];
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


  private addTemporalNotification(msg) {
    this.notification = { type: 'success', data: msg };
    setTimeout(() => this.notification = null, 10000);
  }
  
  private addTemporalErrorNotification(msg) {
    this.notification = { type: 'error', data: msg };
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
      this.data.push([newData.id, newData.mappingProcessor, newData.threads]);
    }
  }

  private removeRowInTable(rowId) {
    this.data = this.data.filter(row => row[0] != rowId);
  }



  rowActionSelected(action: RowResponseModel): void {
    if (action.event == 'edit') {
      this.router.navigate(['/translations/details/' + action.row[0]]);
    }
    else if (action.event == 'delete') {
      this.deleteDialog(action.row[0]);
    }
  }

  
  create() {
    const dialogRef = this.dialog.open(TranslationFormDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.addRowInTable(result);
        this.addTemporalNotification('Translation "' + result.id + '" added correctly.');
      }
    });
  }


  private deleteDialog(translationId) {
    const dialogRef = this.dialog.open(TranslationDeteleDialogComponent, {
      data: {
        translationId: translationId
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      /*
      if (result && result.status == 'ok') {
        this.removeRowInTable(result.data);
        this.addTemporalNotification('Translation "' + result.data + '" deleted correctly.');
      }
      else if (result && result.status == 'error') {
        this.addTemporalErrorNotification('Translation "' + result.data + '" deleted correctly.');
      }
      */
     if (result) {
      this.addTemporalErrorNotification('Translation "' + result.data + '" deleted correctly.');
     }
    });
  }

}
