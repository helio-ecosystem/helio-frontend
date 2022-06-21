import { Component } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  templateUrl: './marketplace-form-dialog.component.html',
  styleUrls: ['./marketplace-form-dialog.component.css']
})
export class MarketplaceFormDialogComponent {

  constructor(private dialog: MatDialogRef<MarketplaceFormDialogComponent>) { }

}
