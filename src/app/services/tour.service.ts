import { Injectable } from '@angular/core';
import {TourSectionModel} from "../models/tour-section";
import allSectionsInJsonFile from '../components/tour/sections.json';

@Injectable({
  providedIn: 'root'
})
export class TourService {

  private tourSections: TourSectionModel[] = [];

  public static playground_mapping_id = 'playground';

  constructor() {
    allSectionsInJsonFile.forEach((value, index: number) => this.tourSections.push(new TourSectionModel({
      sectionId: String(value.name).toLowerCase().replaceAll(' ', '-').replaceAll(/[^a-zA-Z\d-]/g, ''),
      name: value.name,
      description: value.description,
      translation: value.translation_template,
      resultTranslation: value.expected_results
    })));
  }

  allSections(): TourSectionModel[] {
    return this.tourSections;
  }

  section(id: string): TourSectionModel {
    return this.tourSections.find(p => p.sectionId == id);
  }

  previousSection(currentSectionId: string): TourSectionModel {
    const index = this.tourSections.findIndex(p => p.sectionId == currentSectionId);
    return (index - 1 >= 0) ? this.tourSections[index - 1] : null;
  }

  nextSection(currentSectionId: string): TourSectionModel {
    const index = this.tourSections.findIndex(p => p.sectionId == currentSectionId);
    return (index + 1 < this.tourSections.length) ? this.tourSections[index + 1] : null;
  }

}
