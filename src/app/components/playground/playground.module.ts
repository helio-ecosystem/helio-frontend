// Angular Imports
import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import { LayoutsModule } from 'src/app/layouts/layouts.module';
import { CommonModule } from '@angular/common';
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatLineModule} from "@angular/material/core";
import {MatCardModule} from "@angular/material/card";
import {PlaygroundTemplateComponent} from "./playground-template/playground-template.component";
import { PlaygroundHomeComponent } from './playground-home/playground-home.component';
import { PlaygroundTourComponent } from './playground-tour/playground-tour.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { CodeEditorModule } from '@ngstack/code-editor';
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatExpansionModule} from "@angular/material/expansion";

// This Module's Components
const routes: Routes = [
  { path: '', component: PlaygroundHomeComponent },
  { path: 'tour', pathMatch: 'full', component: PlaygroundTourComponent },
  { path: 'tour/:id', component: PlaygroundTourComponent },
];

@NgModule({
  imports: [
    LayoutsModule,
    CommonModule,
    RouterModule.forChild(routes),
    MatButtonModule,
    MatIconModule,
    MatLineModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    CodeEditorModule.forRoot(),
    MatProgressBarModule,
    MatExpansionModule
  ],
    declarations: [
      PlaygroundTemplateComponent,
      PlaygroundHomeComponent,
      PlaygroundTourComponent,
    ],
    exports: [
        RouterModule,
        PlaygroundTemplateComponent
    ]
})
export class PlaygroundModule {}
