import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.scss']
})
export class HomeComponent {

    constructor(private settings: SettingsService, private router: Router) {
        if (router.url == '/') {
            this.router.navigate(['/home']);
        }
        this.settings.setSection('Home');
    }

}
