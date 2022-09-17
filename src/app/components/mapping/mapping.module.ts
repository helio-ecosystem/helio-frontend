// Angular Imports
import { NgModule } from '@angular/core';
import { RouterModule, Routes} from "@angular/router";
import { LayoutsModule } from 'src/app/layouts/layouts.module';
import { CommonModule } from '@angular/common';
import { MappingListComponent } from "./mapping-list/mapping-list.component";
import { MappingFormComponent } from './mapping-form/mapping-form.component';
import { MappingDetailsComponent } from './mapping-details/mapping-details.component';
import { MappingFormDialogComponent } from './mapping-form-dialog/mapping-form-dialog.component';
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatLineModule } from "@angular/material/core";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from "@angular/material/input";
import { MatStepperModule } from '@angular/material/stepper';
import { STEPPER_GLOBAL_OPTIONS } from "@angular/cdk/stepper";
import { ReactiveFormsModule } from "@angular/forms";
import { PlaygroundExportModule } from "../playground/playground-export.module";
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MappingDeteleDialogComponent } from './mapping-detele-dialog/mapping-detele-dialog.component';

// This Module's Components
const routes: Routes = [
  { path: '', component: MappingListComponent },
  { path: 'details/:id', component: MappingDetailsComponent },
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
      MappingListComponent,
      MappingFormComponent,
      MappingDetailsComponent,
      MappingFormDialogComponent,
      MappingDeteleDialogComponent
    ],
    exports: [
        RouterModule,
    ]
})
export class MappingModule {
  static section = 'Mappings';
  static uri = '/mappings';
}
