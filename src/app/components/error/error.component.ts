import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuService } from 'src/app/services/menu.service';

@Component({
    templateUrl: 'error.component.html',
    styleUrls: ['error.component.scss']
})
export class ErrorComponent {

    section: string;
    uri: string;

    constructor(private menu: MenuService) {
        this.section = this.menu.getPrincipalSection();
        this.uri = this.menu.getPrincipalSectionUri();
    }

}
