import {Component, Input} from '@angular/core';
import {FormControl} from "@angular/forms";
import {TranslationService} from "../../../services/translation.service";
import {TranslationModel} from "../../../models/translation";

@Component({
  selector: 'playground-template',
  templateUrl: './playground-template.component.html',
  styleUrls: ['./playground-template.component.css']
})
export class PlaygroundTemplateComponent {

  @Input('') translation;

  translationControl: FormControl;
  translationResults: string;

  private model: TranslationModel =
    new TranslationModel({ id: 'playground', mappingProcessor: '', threads: 1, body: '' });

  constructor(
    private service : TranslationService
  ) {
    this.translationControl = new FormControl(this.translation);
  }

  evaluateTranslation() {
    this.model.setBody(this.translationControl.value);
    this.service.add(this.model).subscribe({
      next: (v) => {
        this.translationResults = '';
        this.service.dataValue(this.model.getId()).subscribe({
          next: (r) => this.translationResults = JSON.stringify(r),
          error: (errorObtainedResults) => this.translationResults = JSON.stringify(errorObtainedResults)
        });
      },
      error: (errorInAddTranslation) => this.translationResults = JSON.parse(JSON.stringify(errorInAddTranslation))['error']['message']
    });
  }



}
