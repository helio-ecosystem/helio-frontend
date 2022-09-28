import { Injectable } from '@angular/core';
import { MenuOptionModel } from 'src/app/models/menu-option';
import { HomeModule } from '../components/home/home.module';
import { MarketplaceModule } from '../components/marketplace/marketplace.module';
import { PlaygroundModule } from '../components/playground/playground.module';
import { TourModule } from '../components/tour/tour.module';
import { MappingModule } from '../components/mapping/mapping.module';
import { SettingsService } from './settings.service';

@Injectable({
    providedIn: 'root'
})
export class MenuService {

  
  private sectionsAvailables = [];
  private menu = [];
  private principalSection: MenuOptionModel;

  constructor(private settings: SettingsService) {
    if (this.settings.isApplicationMode()) {
      this.buildAppMenu();
    }
    else if (this.settings.isPlaygroundMode()) {
      this.buildPlaygroundMenu();
    }
  }

  public hasSection(section: string): boolean {
    return this.sectionsAvailables.includes(section);
  }

  public getPrincipalSection(): string {
    return this.principalSection.title;
  }

  public getPrincipalSectionUri(): string {
    return this.principalSection.uri;
  }

  public getMenu(): MenuOptionModel[] {
    return this.menu;
  }

  private buildAppMenu() {
    var sectionMarketplace = new MenuOptionModel('storefront', MarketplaceModule.section, MarketplaceModule.uri);
    var sectionMapping = new MenuOptionModel('description', MappingModule.section, '');
    var subSectionMapping = new MenuOptionModel('', 'List', MappingModule.uri);
    sectionMapping.addChild(subSectionMapping);

    this.menu = [];
    this.menu.push(sectionMarketplace);
    this.menu.push(sectionMapping);
    this.principalSection = sectionMarketplace;
    this.sectionsAvailables = [
      MarketplaceModule.section, MappingModule.section
    ];
  }

  private buildPlaygroundMenu() {
    var sectionHome = new MenuOptionModel('home', HomeModule.section, HomeModule.uri);
    var sectionPlayground = new MenuOptionModel('science', PlaygroundModule.section, PlaygroundModule.uri);
    var sectionTour = new MenuOptionModel('tour', TourModule.section, TourModule.uri);

    this.menu = [];
    this.menu.push(sectionHome);
    this.menu.push(sectionPlayground);
    this.menu.push(sectionTour);
    this.principalSection = sectionHome;
    this.sectionsAvailables = [
      HomeModule.section, PlaygroundModule.section, TourModule.section
    ];
  }

}


