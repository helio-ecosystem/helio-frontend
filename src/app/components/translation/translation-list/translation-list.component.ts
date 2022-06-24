import { Component } from '@angular/core';
import {SettingsService} from "../../../services/settings.service";
import {TranslationModel} from "../../../models/translation";
import {TranslationService} from "../../../services/translation.service";
import {Router} from "@angular/router";
import {
  MarketplaceFormDialogComponent
} from "../../marketplace/marketplace-form-dialog/marketplace-form-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {TranslationFormDialogComponent} from "../translation-form-dialog/translation-form-dialog.component";

@Component({
  selector: 'app-translation-list',
  templateUrl: './translation-list.component.html',
  styleUrls: ['./translation-list.component.css']
})
export class TranslationListComponent {

  columns = ['id', 'processor', 'threads assigned'];
  data;
  error: string = '';

  constructor(
    private settings: SettingsService,
    private service: TranslationService,
    private router: Router,
    private dialog: MatDialog)
  {
    this.settings.setSection('Translation list');
    this.search();
  }

  search() {
    this.error = '';
    this.service.list().subscribe({
      next: (v) => this.toTableData(v),
      error: (e) => this.error = 'Cannot retrieve translation list. Try again with refresh button.'
    });
  }


  create() {
    const dialogRef = this.dialog.open(TranslationFormDialogComponent, {
      width: '300px'
    });
    //dialogRef.afterClosed().subscribe(() => console.log('Dialogo cerrado'));
  }



  private toTableData(sourceData: any[]) {
    this.data = [];
    sourceData.forEach(s => {
      var d: TranslationModel = new TranslationModel(JSON.parse(JSON.stringify(s)));
      this.data.push([d.getId(), d.getMappingProcessor(), d.getThreads()]);
    });
  }

  rowSelected(row: any[]): void {
    var selected = row[0];
    console.log("Row clicked! " + selected);
    this.router.navigate(['/translations/details/' + selected]);

  }

}
