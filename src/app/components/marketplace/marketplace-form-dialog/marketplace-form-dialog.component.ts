import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import {MatDialogRef} from "@angular/material/dialog";
import { ComponentService } from 'src/app/services/component.service';

@Component({
  templateUrl: './marketplace-form-dialog.component.html',
  styleUrls: ['./marketplace-form-dialog.component.css']
})
export class MarketplaceFormDialogComponent {

  fontSizeControl;
  componentFormGroup;
  
  constructor(
    private dialog: MatDialogRef<MarketplaceFormDialogComponent>,
    private fb: FormBuilder,
    private service: ComponentService) {

      this.fontSizeControl = new FormControl(15);
      this.componentFormGroup = fb.group({
        'source': ['', Validators.required],
        'class': ['', Validators.required],
        'type': ['', Validators.required]
      });
  }


  create() {

  }

  cancel() {
    
  }


}
