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
        MatLineModule
    ],
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
