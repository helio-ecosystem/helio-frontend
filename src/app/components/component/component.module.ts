// Angular Imports
import { NgModule } from '@angular/core';
import { ComponentListComponent } from './component-list/component-list.component';
import {RouterModule, Routes} from "@angular/router";
import { LayoutModule } from '@angular/cdk/layout';
import { LayoutsModule } from 'src/app/layouts/layouts.module';
import { CommonModule } from '@angular/common';

// This Module's Components
const routes: Routes = [
  { path: '', component: ComponentListComponent },
];

@NgModule({
    imports: [
      LayoutsModule,
      CommonModule,
      RouterModule.forChild(routes)
    ],
    declarations: [
        ComponentListComponent,
    ],
    exports: [
        RouterModule,
    ]
})
export class ComponentModule {}
