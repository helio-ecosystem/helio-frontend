import { Injectable } from '@angular/core';
import { MenuOptionModel } from 'src/app/models/menu-option';
import { environment } from 'src/environments/environment';
import { HomeModule } from '../components/home/home.module';
import { MarketplaceModule } from '../components/marketplace/marketplace.module';
import { PlaygroundModule } from '../components/playground/playground.module';
import { TourModule } from '../components/tour/tour.module';
import { TranslationModule } from '../components/translation/translation.module';
import { ModeValue } from '../shared/mode-value';

@Injectable({
    providedIn: 'root'
})
export class MenuService {

  private mode = environment.mode;
  private sectionsAvailables = [];
  private menu = [];
  private principalSection: MenuOptionModel;

  constructor() {
    if (this.mode == ModeValue.APP) {
      this.buildAppMenu();
    }
    else if (this.mode == ModeValue.PLAYGROUND) {
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
    var sectionTranslation = new MenuOptionModel('description', TranslationModule.section, '');
    var subSectionTranslation = new MenuOptionModel('', 'List', TranslationModule.uri);
    sectionTranslation.addChild(subSectionTranslation);

    this.menu = [];
    this.menu.push(sectionMarketplace);
    this.menu.push(sectionTranslation);
    this.principalSection = sectionMarketplace;
    this.sectionsAvailables = [
      MarketplaceModule.section, TranslationModule.section
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


