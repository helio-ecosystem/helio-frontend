import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators
} from "@angular/forms";
import {TranslationService} from "../../../services/translation.service";
import {TranslationModel} from "../../../models/translation";
import {TourService} from "../../../services/tour.service";
import {MatStepper} from "@angular/material/stepper";
import {StepperSelectionEvent} from "@angular/cdk/stepper/stepper";

@Component({
  templateUrl: './translation-form-dialog.component.html',
  styleUrls: ['./translation-form-dialog.component.css']
})
export class TranslationFormDialogComponent {

  firstFormStep: FormGroup;
  fontSizeControl;
  errorLastStep: string;

  private model: TranslationModel =
    new TranslationModel({ id: TourService.playground_translation_id, mappingProcessor: '', threads: 1, body: '' });

  constructor(
    private dialog: MatDialogRef<TranslationFormDialogComponent>,
    private service: TranslationService,
    private fb: FormBuilder)
  {
    this.fontSizeControl = new FormControl(15);
    this.firstFormStep = fb.group({
      'name': ['', Validators.required],
      'translation': ['', Validators.required]
    });

  }

  onStepChanged(step: any): void {
    if (step.selectedIndex == 2) {
      this.errorLastStep = null;
    }
  }

  saveTranslation() {
    this.errorLastStep = null;
    if (this.firstFormStep.valid) {
      this.model.id = this.firstFormStep.controls['name'].value;
      this.model.body = this.firstFormStep.controls['translation'].value;

      this.service.details(this.model.id).subscribe({
        next: (v) => this.errorLastStep = 'Error: Translation name has already exists.',
        error: (e) => {
          this.service.add(this.model).subscribe({
            next: (v) => this.dialog.close(v),
            error: (e) => this.errorLastStep = 'Error: ' + e
          });
        }
      });
    }
    else {
      this.errorLastStep = 'Error: Check the translation information before saving.';
    }
  }


}
