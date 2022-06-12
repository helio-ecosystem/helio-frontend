// Angular Imports
import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import { LayoutsModule } from 'src/app/layouts/layouts.module';
import { CommonModule } from '@angular/common';
import {TranslationListComponent} from "./translation-list/translation-list.component";
import { TranslationFormComponent } from './translation-form/translation-form.component';

// This Module's Components
const routes: Routes = [
  { path: '', component: TranslationListComponent },
];

@NgModule({
    imports: [
      LayoutsModule,
      CommonModule,
      RouterModule.forChild(routes)
    ],
    declarations: [
      TranslationListComponent,
      TranslationFormComponent,
    ],
    exports: [
        RouterModule,
    ]
})
export class TranslationModule {}
