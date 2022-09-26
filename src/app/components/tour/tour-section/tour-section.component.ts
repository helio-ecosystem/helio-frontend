import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TutorialModel } from 'src/app/models/tutorial';
import { TutorialSection } from 'src/app/models/tutorial-section';
import { SecurityService } from 'src/app/services/security.service';
import { SettingsService } from 'src/app/services/settings.service';
import { TourService } from 'src/app/services/tour.service';
import { TourModule } from '../tour.module';

@Component({
    templateUrl: 'tour-section.component.html'
})
export class TourSectionComponent {

  sectionName = null;
  tutorialName = null;

  tutorialSections: TutorialSection[] = [];
  tutorialSelected: TutorialModel = null;

  errorResponse;
  errorTutorialSelected = null;
  

  constructor(
    private tour: TourService,
    private security: SecurityService,
    private route: ActivatedRoute,
    private settings: SettingsService)
  {
    this.security.redirectIfSectionUnavailable(TourModule.section);
    this.settings.setSection(TourModule.section);
    this.route.params.subscribe(params => {
      this.loadTourList();
      
      if (params['parent'] != null && params['child'] != null) {
        this.loadTutorial(params['parent'], params['child']);
      }
      else if (params['parent'] != null && params['child'] == null) {
        this.temporalErrorNotification();
      }
    });
  }

  private loadTourList() {
    this.tour.tourDirectory().subscribe({
      next: (value) => this.tutorialSections = value,
      error: (e) => this.errorResponse = e
    });
  }

  private loadTutorial(parent: string, child: string) {
    this.tour.tutorialContent(parent + '/' + child + '.json').subscribe({
      next: (v) => {
        this.sectionName = this.tour.removeSpecialChars(parent);
        this.tutorialName = this.tour.removeSpecialChars(child);
        this.tutorialSelected = v;
      },
      error: (e) => this.temporalErrorNotification()
    });
  }

  private temporalErrorNotification() {
    this.errorTutorialSelected = true;
    setTimeout(() => this.errorTutorialSelected = null, 10000);
  }
  
}
