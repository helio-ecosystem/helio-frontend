import { Injectable } from '@angular/core';
import {PlaygroundTourSectionModel} from "../models/playground-tour-section";
import allSectionsInJsonFile from '../components/playground/playground-tour/sections.json';

@Injectable({
  providedIn: 'root'
})
export class PlaygroundTourService {

  private tourSections: PlaygroundTourSectionModel[] = [];

  public static playground_translation_id = 'playground';

  constructor() {
    allSectionsInJsonFile.forEach((value, index: number) => this.tourSections.push(new PlaygroundTourSectionModel({
      sectionId: String(value.name).toLowerCase().replaceAll(' ', '-').replaceAll(/[^a-zA-Z\d-]/g, ''),
      name: value.name,
      description: value.description,
      translation: value.translation_template,
      resultTranslation: value.expected_results
    })));
  }

  allSections(): PlaygroundTourSectionModel[] {
    return this.tourSections;
  }

  section(id: string): PlaygroundTourSectionModel {
    return this.tourSections.find(p => p.sectionId == id);
  }

  previousSection(currentSectionId: string): PlaygroundTourSectionModel {
    const index = this.tourSections.findIndex(p => p.sectionId == currentSectionId);
    return (index - 1 >= 0) ? this.tourSections[index - 1] : null;
  }

  nextSection(currentSectionId: string): PlaygroundTourSectionModel {
    const index = this.tourSections.findIndex(p => p.sectionId == currentSectionId);
    return (index + 1 < this.tourSections.length) ? this.tourSections[index + 1] : null;
  }

}
