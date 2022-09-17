import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TourSectionModel } from 'src/app/models/tour-section';
import { SecurityService } from 'src/app/services/security.service';
import { SettingsService } from 'src/app/services/settings.service';
import { TourService } from 'src/app/services/tour.service';
import { TourModule } from '../tour.module';

@Component({
    templateUrl: 'tour-section.component.html'
})
export class TourSectionComponent {

  allSectionsEnable: boolean = true;
  currentSection: TourSectionModel[] = [];
  previousSection: TourSectionModel = null;
  nextSection: TourSectionModel = null;

  constructor(
    private security: SecurityService,
    private route: ActivatedRoute,
    private router: Router,
    private service: TourService,
    private settings: SettingsService)
  {
    this.security.redirectIfSectionUnavailable(TourModule.section);
    this.settings.setSection(TourModule.section);
    this.route.params.subscribe(params => {
      if (params['id'] == null) {
        this.currentSection = this.service.allSections();
      }
      else {
        const provisionalSection = this.service.section(String(params['id']));
        if (provisionalSection) {
          this.currentSection = [provisionalSection];
          this.previousSection = this.service.previousSection(provisionalSection.sectionId);
          this.nextSection = this.service.nextSection(provisionalSection.sectionId);
          this.allSectionsEnable = false;
        }
        else {
            this.router.navigate(['/tour']);
        }
      }
    });
  }

  public changeSection(sectionId: string) {
    this.router.navigate(['/tour/' + (sectionId != null ? sectionId : '' )]);
  }
  
}
