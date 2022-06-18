import {Component, Input, OnInit} from '@angular/core';
import {TranslationModel} from "../../../models/translation";

@Component({
  selector: 'app-translation-template',
  templateUrl: './translation-template.component.html',
  styleUrls: ['./translation-template.component.css']
})
export class TranslationTemplateComponent {

  @Input() translation: TranslationModel;

}
