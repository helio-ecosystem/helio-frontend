import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {TranslationService} from "../../../services/translation.service";
import {TranslationModel} from "../../../models/translation";

@Component({
  selector: 'app-translation-details',
  templateUrl: './translation-details.component.html',
  styleUrls: ['./translation-details.component.css']
})
export class TranslationDetailsComponent implements OnInit {

  private id = null;
  translation: TranslationModel = null;
  error = null;

  loading = false;
  data = null;
  errorData = null;

  constructor(
    private route: ActivatedRoute,
    private service: TranslationService) {
    this.route.params.subscribe(params => this.id = params['id']);
  }

  ngOnInit(): void {
    if (this.id) {
      this.service.details(this.id).subscribe({
        next: (v) => this.translation = v,
        error: (e) => this.error = 'Translation with id ' + this.id + ' do not exists. (error details: ' + e + ')'
      });
    }
    else {
      this.error = 'You have to select a translation item';
    }
  }

  executeTranslate() {
    this.loading = true;
    this.data = null;
    this.errorData = null;
    this.service.dataValue(this.id).subscribe({
      next: (v) => { this.data = v; this.loading = false; },
      error: (e) => { this.errorData = e; this.loading = false; }
    });
  }

}
