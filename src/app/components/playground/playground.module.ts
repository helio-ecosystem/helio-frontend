// Angular Imports
import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatLineModule} from "@angular/material/core";
import {MatCardModule} from "@angular/material/card";
import { PlaygroundHomeComponent } from './playground-home/playground-home.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatExpansionModule} from "@angular/material/expansion";
import {PlaygroundExportModule} from "./playground-export.module";

// This Module's Components
const routes: Routes = [
  { path: '', component: PlaygroundHomeComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    MatButtonModule,
    MatIconModule,
    MatLineModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressBarModule,
    MatExpansionModule,
    PlaygroundExportModule
  ],
    declarations: [
      PlaygroundHomeComponent,
    ],
    exports: [
        RouterModule,

    ]
})
export class PlaygroundModule {
  static section = 'Playground';
  static uri = '/playground';
  static mappingId = 'playground';
}
