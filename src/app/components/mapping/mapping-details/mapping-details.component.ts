import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { MappingService } from "../../../services/mapping.service";
import { MappingModel } from "../../../models/mapping";
import { SettingsService } from 'src/app/services/settings.service';
import { SecurityService } from 'src/app/services/security.service';
import { MappingModule } from '../mapping.module';
import { PlaygroundModule } from '../../playground/playground.module';
import { ComponentService } from 'src/app/services/component.service';
import { BUILDER_TYPE } from 'src/app/shared/component-types';

@Component({
  templateUrl: './mapping-details.component.html',
  styleUrls: ['./mapping-details.component.css']
})
export class MappingDetailsComponent implements OnInit {

  private id = null;
  mapping: MappingModel = null;
  error = null;

  showDetails = true;
  notificationSaved;

  constructor(
    private security: SecurityService,
    private route: ActivatedRoute,
    private router: Router,
    private settings: SettingsService,
    private service: MappingService,
    private components: ComponentService)
  {
    this.security.redirectIfSectionUnavailable(MappingModule.section);
    this.settings.setSection(MappingModule.section);
    this.route.params.subscribe(params => this.id = params['id']);
  }

  ngOnInit(): void {
    if (!this.id) {
      this.error = 'You have to select a mapping item';
    }
    else if (this.id == PlaygroundModule.mappingId) {
      this.error = 'Mapping with id ' + this.id + ' is not available.';
    }
    else {
      this.service.details(this.id).subscribe({
        next: (v) => this.mapping = v,
        error: (e) => this.error = 'Mapping with id ' + this.id + ' does not exist.'
      }); 
    }
  }

  changedMapping(data: MappingModel) {
    this.mapping.id = data.id;
    this.mapping.body = data.body;
    this.mapping.mappingProcessor = data.mappingProcessor;
    this.mapping.threads = data.threads;
    this.notificationSaved = 'Mapping has been saved successfully!';
    setTimeout(() => this.notificationSaved = null, 5000);
  }

  backToMappingList() {
    this.router.navigate([MappingModule.uri]);
  }

}
