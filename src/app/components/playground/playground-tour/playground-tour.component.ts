import { Component } from '@angular/core';
import {PlaygroundTourService} from "../../../services/playground-tour.service";
import {ActivatedRoute, Router} from "@angular/router";
import {PlaygroundTourSectionModel} from "../../../models/playground-tour-section";

@Component({
  templateUrl: './playground-tour.component.html',
  styleUrls: ['./playground-tour.component.css']
})
export class PlaygroundTourComponent {

  allSectionsEnable: boolean = true;
  currentSection: PlaygroundTourSectionModel[] = [];
  previousSection: PlaygroundTourSectionModel = null;
  nextSection: PlaygroundTourSectionModel = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: PlaygroundTourService)
  {
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
            this.router.navigate(['/playground/tour']);
        }
      }
    });
  }

  public changeSection(sectionId: string) {
    this.router.navigate(['/playground/tour/' + (sectionId != null ? sectionId : '' )]);
  }

}
