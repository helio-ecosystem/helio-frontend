import { Component } from '@angular/core';
import {SettingsService} from "../../../services/settings.service";

@Component({
  templateUrl: './playground-home.component.html',
  styleUrls: ['./playground-home.component.css']
})
export class PlaygroundHomeComponent {

  constructor(
    private settings: SettingsService
  )
  {
    this.settings.setSection('Playground');
  }

}
