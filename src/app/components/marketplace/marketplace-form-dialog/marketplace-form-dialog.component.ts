import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import {MatDialogRef} from "@angular/material/dialog";
import { ComponentModel } from 'src/app/models/component';
import { ComponentService } from 'src/app/services/component.service';
import { types } from '../../../shared/component-types';

@Component({
  templateUrl: './marketplace-form-dialog.component.html',
  styleUrls: ['./marketplace-form-dialog.component.css']
})
export class MarketplaceFormDialogComponent {

  componentTypes = types;

  fontSizeControl;
  componentFormGroup;
  disableButton = false;
  errorForm;

  constructor(
    private dialog: MatDialogRef<MarketplaceFormDialogComponent>,
    private fb: FormBuilder,
    private service: ComponentService) {

      this.fontSizeControl = new FormControl(15);
      this.componentFormGroup = fb.group({
        'source': ['', Validators.required],
        'clazz': ['', Validators.required],
        'type': ['', Validators.required]
      });
  }

  create() {
    this.errorForm = null;
    if (this.componentFormGroup.valid) {
      this.disableButton = true;
      var component = new ComponentModel(this.componentFormGroup.getRawValue());
      this.service.addComponent(component).subscribe({
        next: (v) => this.dialog.close(component),
        error: (e) => {
          this.errorForm = JSON.parse(JSON.stringify(e))['error']['message'];
          this.disableButton = false;
        }
      });
    }
    else {
      this.errorForm = 'Error: Fill the required fields.';
    }

  }

  cancel() {
    this.dialog.close();
  }

}
