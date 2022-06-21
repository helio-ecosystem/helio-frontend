import { Component } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  templateUrl: './translation-form-dialog.component.html',
  styleUrls: ['./translation-form-dialog.component.css']
})
export class TranslationFormDialogComponent {

  constructor(private dialog: MatDialogRef<TranslationFormDialogComponent>) { }

}
