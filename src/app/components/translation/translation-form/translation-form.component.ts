import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslationModel } from 'src/app/models/translation';
import { TranslationService } from 'src/app/services/translation.service';

@Component({
  selector: 'app-translation-form',
  templateUrl: './translation-form.component.html',
  styleUrls: ['./translation-form.component.css']
})
export class TranslationFormComponent implements OnChanges {

  @Input() displayFormModes: boolean = false;
  @Input() editionMode: boolean = false;
  @Input() translationData: TranslationModel;
  @Input() disableFields: string[] = [];
  @Output() onDataChanged = new EventEmitter<TranslationModel>();
  
  form: FormGroup;
  error = null;
  private auxTranslationData: TranslationModel;

  fontSizeControl: FormControl;
  disabledFormFieldsInEditionMode = {};


  constructor(
    private fb: FormBuilder,
    private service: TranslationService)
  {
    this.fontSizeControl = new FormControl(15);
      this.auxTranslationData = new TranslationModel({
        id: '',
        mappingProcessor: '',
        body: '',
        threads: 1
      });

      this.disabledFormFieldsInEditionMode['name'] = false;
      this.disabledFormFieldsInEditionMode['translation'] = false;
  }


  ngOnChanges(changes: SimpleChanges): void {
    if (changes) {
      if (changes['displayFormModes']) {
        this.displayFormModes = changes['displayFormModes'].currentValue;
      }
      if (changes['translationData']) {
        this.auxTranslationData.id = changes['translationData'].currentValue.id;
        this.auxTranslationData.mappingProcessor = changes['translationData'].currentValue.mappingProcessor;
        this.auxTranslationData.body = changes['translationData'].currentValue.body;
        this.auxTranslationData.threads = changes['translationData'].currentValue.threads;
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
          ? [this.auxTranslationData.id, Validators.required]
          : new FormControl({ value: this.auxTranslationData.id, disabled: true }),

      'translation': isEditionMode && !this.disabledFormFieldsInEditionMode['translation']
          ? [this.auxTranslationData.body, Validators.required]
          : new FormControl({ value: this.auxTranslationData.body, disabled: true }) 
    });
  }


  saveTranslation() {
    this.error = null;
    if (this.form.valid) {
      this.auxTranslationData.body = this.form.controls['translation'].value;
      this.service.add(this.auxTranslationData).subscribe({
        next: (v) => this.onDataChanged.emit(this.auxTranslationData),
        error: (e) => this.error = JSON.parse(e['error']).message
      });
    }
    else {
      this.error = 'Error: Check the translation information before saving.';
    }
  }

}
