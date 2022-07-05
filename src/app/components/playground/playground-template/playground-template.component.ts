import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import { FormBuilder, FormControl } from "@angular/forms";
import { TranslationService } from "../../../services/translation.service";
import { TranslationModel } from "../../../models/translation";
import {PlaygroundTourSectionModel} from "../../../models/playground-tour-section";
import {PlaygroundTourService} from "../../../services/playground-tour.service";

@Component({
  selector: 'playground-template',
  templateUrl: './playground-template.component.html',
  styleUrls: ['./playground-template.component.css']
})
export class PlaygroundTemplateComponent implements OnChanges {

  @Input() translation: string;
  @Input() sectionModel: PlaygroundTourSectionModel;

  translationControl: FormControl;
  translationResults: string;
  translationResultsSuccess: boolean;
  loadingTranslation: boolean;

  private model: TranslationModel =
    new TranslationModel({ id: PlaygroundTourService.playground_translation_id, mappingProcessor: '', threads: 1, body: '' });

  constructor(
    private fb: FormBuilder,
    private service : TranslationService) {
    this.translationControl = this.fb.control(" ");
  }

  evaluateTranslation() {
    this.model.setBody(this.translationControl.value);
    this.loadingTranslation = true;
    this.translationResults = null;
    this.translationResultsSuccess = null;
    this.service.add(this.model).subscribe({
      next: (v) => {
        this.translationResults = '';
        this.service.dataValue(this.model.getId()).subscribe({
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
    if (changes['translation'] || changes['sectionModel']) {
      if (changes['translation']) {
        this.translationControl = this.fb.control(changes['translation'].currentValue);
      }
      if (changes['sectionModel']) {
        this.translationControl = this.fb.control(changes['sectionModel'].currentValue._translation);
      }
    }
  }

}
