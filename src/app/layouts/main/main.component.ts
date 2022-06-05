import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import {MenuService} from "../../services/menu.service";
import {ItemMenuModel} from "../../models/menu/item-menu";
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  sectionTitle = 'Home';
  itemsMenu: any[] = [];

  constructor(private breakpointObserver: BreakpointObserver,
              private service: MenuService,
              private settings: SettingsService) {
    //this.itemsMenu = service.buildMenu();
       
    this.settings.onChangeSection().subscribe({
      next: (v) => this.sectionTitle = v
    });
  }


}
