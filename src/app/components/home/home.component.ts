import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GitHubApiService } from 'src/app/services/github-api.service';
import { SecurityService } from 'src/app/services/security.service';
import { SettingsService } from 'src/app/services/settings.service';
import { HomeModule } from './home.module';

@Component({
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.scss']
})
export class HomeComponent {

    body = null;

    constructor(
        private github: GitHubApiService,
        private router: Router,
        private security: SecurityService,
        private settings: SettingsService)
    {
        this.security.redirectIfSectionUnavailable(HomeModule.section);
        if (this.router.url == '/') {
            this.router.navigate([HomeModule.uri]);
        }
        this.settings.setSection(HomeModule.section);
        this.github.repositoryMarkdown().subscribe({
            next: (v) => this.body = v
        });
    }

}
