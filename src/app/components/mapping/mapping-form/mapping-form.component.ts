import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MappingModel } from 'src/app/models/mapping';
import { ComponentService } from 'src/app/services/component.service';
import { MappingService } from 'src/app/services/mapping.service';
import { BUILDER_TYPE } from 'src/app/shared/component-types';

@Component({
  selector: 'app-mapping-form',
  templateUrl: './mapping-form.component.html',
  styleUrls: ['./mapping-form.component.css']
})
export class MappingFormComponent implements OnChanges {

  @Input() displayFormModes: boolean = false;
  @Input() editionMode: boolean = false;
  @Input() mappingData: MappingModel;
  @Input() disableFields: string[] = [];
  @Output() onDataChanged = new EventEmitter<MappingModel>();
  
  form: FormGroup;
  error = null;
  private auxMappingData: MappingModel;

  fontSizeControl: FormControl;
  
  disabledFormFieldsInEditionMode = {};

  private defaultBuilderType = 'Default';
  builderTypes = [this.defaultBuilderType];
  isSaving = false;

  constructor(
    private fb: FormBuilder,
    private components: ComponentService,
    private service: MappingService)
  {
    this.fontSizeControl = new FormControl(15);
    this.auxMappingData = new MappingModel({
      id: '',
      mappingProcessor: '',
      body: '',
      threads: 1
    });

    this.disabledFormFieldsInEditionMode['name'] = false;
    this.disabledFormFieldsInEditionMode['builder'] = false;
    this.disabledFormFieldsInEditionMode['mapping'] = false;
    
    this.components.getComponentsByType(BUILDER_TYPE).subscribe({
      next: (v) => this.builderTypes = v.map(c => c.clazz.split('.').pop())
    });
  }


  ngOnChanges(changes: SimpleChanges): void {
    if (changes) {
      if (changes['displayFormModes']) {
        this.displayFormModes = changes['displayFormModes'].currentValue;
      }
      if (changes['mappingData']) {
        this.auxMappingData.id = changes['mappingData'].currentValue.id;
        this.auxMappingData.mappingProcessor = changes['mappingData'].currentValue.mappingProcessor;
        this.auxMappingData.body = changes['mappingData'].currentValue.body;
        this.auxMappingData.threads = changes['mappingData'].currentValue.threads;
      }
      if (changes['disableFields']) {
        this.disabledFormFieldsInEditionMode = {};
        changes['disableFields'].currentValue.forEach(e => {
          this.disabledFormFieldsInEditionMode[e] = true;
        });
      }

      this.changeEditionMode(this.editionMode);
    }
  }


  changeEditionMode(isEditionMode) {
    this.editionMode = isEditionMode;
    this.form = this.fb.group({
      'name': isEditionMode && !this.disabledFormFieldsInEditionMode['name']
          ? [this.auxMappingData.id, Validators.required]
          : new FormControl({ value: this.auxMappingData.id, disabled: true }),
      'builder': isEditionMode && !this.disabledFormFieldsInEditionMode['builder']
          ? [this.auxMappingData.mappingProcessor, Validators.required]
          : new FormControl({
              value: this.auxMappingData.mappingProcessor != this.defaultBuilderType 
                ? this.auxMappingData.mappingProcessor : this.builderTypes[0],
              disabled: true }),
      'mapping': isEditionMode && !this.disabledFormFieldsInEditionMode['mapping']
          ? [this.auxMappingData.body, Validators.required]
          : new FormControl({ value: this.auxMappingData.body, disabled: true }) 
    });
  }


  saveMapping() {
    this.error = null;
    if (this.form.valid) {
      this.isSaving = true;
      this.auxMappingData.body = this.form.controls['mapping'].value;
      this.auxMappingData.mappingProcessor = this.form.controls['builder'].value;
      this.service.add(this.auxMappingData).subscribe({
        next: (v) => {
          this.onDataChanged.emit(this.auxMappingData);
          this.isSaving = false;
        },
        error: (e) => {
          this.error = JSON.parse(e['error']).message;
          this.isSaving = false;
        }
      });
    }
    else {
      this.error = 'Error: Check the mapping information before saving.';
    }
  }

}
