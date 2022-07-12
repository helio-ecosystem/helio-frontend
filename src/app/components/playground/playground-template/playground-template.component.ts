import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import { FormBuilder, FormControl } from "@angular/forms";
import { TranslationService } from "../../../services/translation.service";
import { TranslationModel } from "../../../models/translation";
import {TourSectionModel} from "../../../models/tour-section";
import {TourService} from "../../../services/tour.service";

@Component({
  selector: 'playground-template',
  templateUrl: './playground-template.component.html',
  styleUrls: ['./playground-template.component.css']
})
export class PlaygroundTemplateComponent implements OnChanges {

  @Input() disabledArea: boolean;
  @Input() translation: string;
  @Input() sectionModel: TourSectionModel;

  translationControl: FormControl;
  translationResults: string;
  translationResultsSuccess: boolean;
  loadingTranslation: boolean;

  private model: TranslationModel =
    new TranslationModel({ id: TourService.playground_translation_id, mappingProcessor: '', threads: 1, body: '' });

  constructor(private service : TranslationService) {
    this.translationControl = new FormControl({ value: '', disabled: false });
  }


  evaluateTranslation() {
    this.model.body = this.translationControl.value;
    this.loadingTranslation = true;
    this.translationResults = null;
    this.translationResultsSuccess = null;
    this.service.add(this.model).subscribe({
      next: (v) => {
        this.translationResults = '';
        this.service.dataValue(this.model.id).subscribe({
          next: (r) => {
            this.translationResults = r.trim();
            this.translationResultsSuccess = true;
            this.loadingTranslation = false;
          },
          error: (errorObtainedResults) => {
            this.translationResults = JSON.stringify(errorObtainedResults)
            this.translationResultsSuccess = false;
            this.loadingTranslation = false;
          }
        });
      },
      error: (errorInAddTranslation) => {
        if (JSON.parse(JSON.stringify(errorInAddTranslation))['error']['message']) {
          this.translationResults = JSON.parse(JSON.stringify(errorInAddTranslation))['error']['message'];
        }
        else {
          this.translationResults = JSON.parse(JSON.stringify(errorInAddTranslation))['message'];
        }
        this.translationResultsSuccess = false;
        this.loadingTranslation = false;
      }
    });

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes) {
      if (changes['translation']) {
        this.translationControl.setValue(changes['translation'].currentValue);
      }
      if (changes['sectionModel']) {
        this.translationControl.setValue(changes['sectionModel'].currentValue._translation);
      }
      if (changes['disabledArea']) {
        var val = this.translationControl.value;
        this.translationControl = new FormControl({ value: val, disabled: this.disabledArea != null && this.disabledArea });
      }
    }
  }
}
