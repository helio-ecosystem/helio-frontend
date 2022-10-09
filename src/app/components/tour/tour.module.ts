// Angular Imports
import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import { LayoutsModule } from 'src/app/layouts/layouts.module';
import { CommonModule } from '@angular/common';
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatLineModule} from "@angular/material/core";
import {MatCardModule} from "@angular/material/card";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatExpansionModule} from "@angular/material/expansion";
import { TourSectionComponent } from './tour-section/tour-section.component';
import { PlaygroundExportModule } from '../playground/playground-export.module';
import { MatListModule } from '@angular/material/list';

// This Module's Components
const routes: Routes = [
  { path: '', pathMatch: 'full', component: TourSectionComponent },
  { path: ':parent', component: TourSectionComponent },
  { path: ':parent/:child', component: TourSectionComponent },
];
@NgModule({
  imports: [
    RouterModule.forChild(routes),
    LayoutsModule,
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatLineModule,
    MatCardModule,
    MatListModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressBarModule,
    MatExpansionModule,
    PlaygroundExportModule
  ],
    declarations: [
      TourSectionComponent
    ],
    exports: [
    ]
})
export class TourModule {
  static section = 'Tour';
  static uri = '/tour';
}
