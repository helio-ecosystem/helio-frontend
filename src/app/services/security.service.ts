import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MenuService } from './menu.service';

@Injectable({
    providedIn: 'root'
})
export class SecurityService {

    constructor(private router: Router, private menuService: MenuService) { }

    public redirectIfSectionUnavailable(section: string) {
        if (!this.menuService.hasSection(section)) {
            this.router.navigate([this.menuService.getPrincipalSectionUri()]);
        }
    }

}