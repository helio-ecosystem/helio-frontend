import { Component } from '@angular/core';
import { MatDialogRef } from "@angular/material/dialog";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { MappingService } from "../../../services/mapping.service";
import { MappingModel } from "../../../models/mapping";
import { ComponentService } from 'src/app/services/component.service';
import { BUILDER_TYPE } from 'src/app/shared/component-types';
import { MappingModule } from '../mapping.module';

@Component({
  templateUrl: './mapping-form-dialog.component.html',
  styleUrls: ['./mapping-form-dialog.component.css']
})
export class MappingFormDialogComponent {

  private defaultBuilderType = 'Default';
  builderTypes = [this.defaultBuilderType];

  builder = null;
  mappingId = MappingModule.mappingId;
  mapping = null;

  firstFormStep: FormGroup;
  fontSizeControl;
  errorLastStep: string;
  
  public model: MappingModel =
    new MappingModel({ id: MappingModule.mappingId, mappingProcessor: '', threads: 1, body: '' });

  constructor(
    private dialog: MatDialogRef<MappingFormDialogComponent>,
    private service: MappingService,
    private components: ComponentService,
    private fb: FormBuilder)
  {
    this.fontSizeControl = new FormControl(15);
    this.firstFormStep = fb.group({
      'name': ['', Validators.required],
      'builder': [ this.builderTypes[0], Validators.required],
      'mapping': ['', Validators.required]
    });
    this.components.getComponentsByType(BUILDER_TYPE).subscribe({
      next: (v) => {
        this.builderTypes = v.map(c => c.clazz.split('.').pop());
        this.firstFormStep.controls['builder'].setValue(this.builderTypes[0]);
      }
    });

  }

  onStepChanged(step: any): void {
    if (step.selectedIndex == 1) {
      this.builder = this.firstFormStep.controls['builder'].value != this.defaultBuilderType
      ? this.firstFormStep.controls['builder'].value : null;
      this.mapping = this.firstFormStep.controls['mapping'].value;
    }
    else if (step.selectedIndex == 2) {
      this.errorLastStep = null;
    }
  }

  saveMapping() {
    this.errorLastStep = null;
    if (this.firstFormStep.valid) {
      this.model.id = this.firstFormStep.controls['name'].value;
      this.model.mappingProcessor = this.firstFormStep.controls['builder'].value != this.defaultBuilderType
          ? this.firstFormStep.controls['builder'].value : null;
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
