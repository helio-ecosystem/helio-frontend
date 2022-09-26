import { Component } from '@angular/core';
import { MatDialogRef } from "@angular/material/dialog";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { MappingService } from "../../../services/mapping.service";
import { MappingModel } from "../../../models/mapping";
import { types } from '../../../shared/builder-types';
import { PlaygroundModule } from '../../playground/playground.module';

@Component({
  templateUrl: './mapping-form-dialog.component.html',
  styleUrls: ['./mapping-form-dialog.component.css']
})
export class MappingFormDialogComponent {

  builderTypes = types;

  firstFormStep: FormGroup;
  fontSizeControl;
  errorLastStep: string;
 
  private model: MappingModel =
    new MappingModel({ id: PlaygroundModule.mappingId, mappingProcessor: '', threads: 1, body: '' });

  constructor(
    private dialog: MatDialogRef<MappingFormDialogComponent>,
    private service: MappingService,
    private fb: FormBuilder)
  {
    this.fontSizeControl = new FormControl(15);
    this.firstFormStep = fb.group({
      'name': ['', Validators.required],
      'builder': [this.builderTypes[0], Validators.required],
      'mapping': ['', Validators.required]
    });
    
  }

  onStepChanged(step: any): void {
    if (step.selectedIndex == 2) {
      this.errorLastStep = null;
    }
  }

  saveMapping() {
    this.errorLastStep = null;
    if (this.firstFormStep.valid) {
      this.model.id = this.firstFormStep.controls['name'].value;
      this.model.mappingProcessor = this.firstFormStep.controls['builder'].value;
      this.model.body = this.firstFormStep.controls['mapping'].value;

      this.service.details(this.model.id).subscribe({
        next: (v) => this.errorLastStep = 'Error: Mapping name has already exists.',
        error: (e) => {
          this.service.add(this.model).subscribe({
            next: (v) => {
              var dataValue = JSON.parse(v);
              this.model.mappingProcessor = dataValue.mappingProcessor;
              this.model.threads = dataValue.threads;
              this.dialog.close(this.model);
            },
            error: (e) => {
              //this.errorLastStep = 'Error: ' + JSON.stringify(e);
              this.dialog.close(this.model);
            }
          });
        }
      });
    }
    else {
      this.errorLastStep = 'Error: Check the mapping information before saving.';
    }
  }

}
