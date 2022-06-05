import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  ngOnInit() {
    // prevent empty links to reload the page
    document.addEventListener('click', e => {
        const target: any = e.target as HTMLElement;
        if (target.tagName === 'A' && ['', '#'].indexOf(target.getAttribute('href')) > -1)
            e.preventDefault();
    });
}
}
