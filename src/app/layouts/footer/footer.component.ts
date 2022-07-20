import { Component } from '@angular/core';
import { SettingsService } from 'src/app/services/settings.service';
import { environment } from "../../../environments/environment";

@Component({
    selector: 'app-footer',
    templateUrl: 'footer.component.html',
    styleUrls: ['./footer.component.css']
})
export class FooterComponent {

  version = SettingsService.APP_VERSION;

}
