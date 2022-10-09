// Angular Imports
import { NgModule } from '@angular/core';
import { LayoutsModule } from 'src/app/layouts/layouts.module';
import { CommonModule } from '@angular/common';
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatLineModule} from "@angular/material/core";
import {MatCardModule} from "@angular/material/card";
import {PlaygroundTemplateComponent} from "./playground-template/playground-template.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatExpansionModule} from "@angular/material/expansion";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

// This Module's Components

@NgModule({
  imports: [
    LayoutsModule,
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatLineModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressBarModule,
    MatExpansionModule
  ],
    declarations: [
      PlaygroundTemplateComponent,
    ],
    exports: [
        PlaygroundTemplateComponent
    ]
})
export class PlaygroundExportModule {}
