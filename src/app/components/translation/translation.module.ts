// Angular Imports
import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import { LayoutsModule } from 'src/app/layouts/layouts.module';
import { CommonModule } from '@angular/common';
import {TranslationListComponent} from "./translation-list/translation-list.component";
import { TranslationFormComponent } from './translation-form/translation-form.component';
import { TranslationDetailsComponent } from './translation-details/translation-details.component';
import { TranslationTemplateComponent } from './translation-template/translation-template.component';
import { TranslationFormDialogComponent } from './translation-form-dialog/translation-form-dialog.component';
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatLineModule} from "@angular/material/core";
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from "@angular/material/input";
import {MatStepperModule} from '@angular/material/stepper';
import {STEPPER_GLOBAL_OPTIONS} from "@angular/cdk/stepper";
import {ReactiveFormsModule} from "@angular/forms";
import {PlaygroundExportModule} from "../playground/playground-export.module";
import {MatButtonToggleModule} from '@angular/material/button-toggle';

// This Module's Components
const routes: Routes = [
  { path: '', component: TranslationListComponent },
  { path: 'details/:id', component: TranslationDetailsComponent },
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
    MatFormFieldModule,
    MatInputModule,
    MatStepperModule,
    ReactiveFormsModule,
    PlaygroundExportModule,
    MatButtonToggleModule
  ],
  providers: [{
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true, displayDefaultIndicatorType: false },
  }],
    declarations: [
      TranslationListComponent,
      TranslationFormComponent,
      TranslationDetailsComponent,
      TranslationTemplateComponent,
      TranslationFormDialogComponent,
    ],
    exports: [
        RouterModule,
    ]
})
export class TranslationModule {}
