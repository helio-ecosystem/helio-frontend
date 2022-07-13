import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {TranslationService} from "../../../services/translation.service";
import {TranslationModel} from "../../../models/translation";
import { TourService } from 'src/app/services/tour.service';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  templateUrl: './translation-details.component.html',
  styleUrls: ['./translation-details.component.css']
})
export class TranslationDetailsComponent implements OnInit {

  private id = null;
  translation: TranslationModel = null;
  error = null;

  showDetails = true;
  notificationSaved;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private settings: SettingsService,
    private service: TranslationService) {
    this.settings.setSection('Translation');
    this.route.params.subscribe(params => this.id = params['id']);
  }

  ngOnInit(): void {
    if (!this.id) {
      this.error = 'You have to select a translation item';
    }
    else if (this.id == TourService.playground_translation_id) {
      this.error = 'Translation with id ' + this.id + ' is not available.';
    }
    else {
      this.service.details(this.id).subscribe({
        next: (v) => this.translation = v,
        error: (e) => this.error = 'Translation with id ' + this.id + ' does not exist.'
      }); 
    }
  }

  changedTranslation(data) {
    this.translation = data;
    this.notificationSaved = 'Translation has been saved successfully!';
    setTimeout(() => this.notificationSaved = null, 5000);
  }

  backToTranslationList() {
    this.router.navigate(['/translations']);
  }

}
