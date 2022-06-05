import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    templateUrl: 'error.component.html',
    styleUrls: ['error.component.scss']
})
export class ErrorComponent {

    uri: string;

    constructor(private router: Router) {
        this.uri = router.url;
    }

}
