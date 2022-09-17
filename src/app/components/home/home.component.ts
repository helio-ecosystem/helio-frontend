import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SecurityService } from 'src/app/services/security.service';
import { SettingsService } from 'src/app/services/settings.service';
import { HomeModule } from './home.module';

@Component({
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.scss']
})
export class HomeComponent {

    constructor(
        private router: Router,
        private security: SecurityService,
        private settings: SettingsService)
    {
        this.security.redirectIfSectionUnavailable(HomeModule.section);
        if (this.router.url == '/') {
            this.router.navigate([HomeModule.uri]);
        }
        this.settings.setSection(HomeModule.section);
    }

}
