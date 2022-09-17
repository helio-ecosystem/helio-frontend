import { Component } from '@angular/core';
import { SecurityService } from 'src/app/services/security.service';
import {SettingsService } from "../../../services/settings.service";
import { PlaygroundModule } from '../playground.module';

@Component({
  templateUrl: './playground-home.component.html',
  styleUrls: ['./playground-home.component.css']
})
export class PlaygroundHomeComponent {

  constructor(
    private security: SecurityService,
    private settings: SettingsService)
  {
    this.security.redirectIfSectionUnavailable(PlaygroundModule.section);
    this.settings.setSection(PlaygroundModule.section);
  }

}
