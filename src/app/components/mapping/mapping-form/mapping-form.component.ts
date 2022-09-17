import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MappingModel } from 'src/app/models/mapping';
import { MappingService } from 'src/app/services/mapping.service';

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


  constructor(
    private fb: FormBuilder,
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
      this.disabledFormFieldsInEditionMode['mapping'] = false;
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
      'mapping': isEditionMode && !this.disabledFormFieldsInEditionMode['mapping']
          ? [this.auxMappingData.body, Validators.required]
          : new FormControl({ value: this.auxMappingData.body, disabled: true }) 
    });
  }


  saveMapping() {
    this.error = null;
    if (this.form.valid) {
      this.auxMappingData.body = this.form.controls['mapping'].value;
      this.service.add(this.auxMappingData).subscribe({
        next: (v) => this.onDataChanged.emit(this.auxMappingData),
        error: (e) => this.error = JSON.parse(e['error']).message
      });
    }
    else {
      this.error = 'Error: Check the mapping information before saving.';
    }
  }

}
