import { Component, Input, OnChanges, SimpleChanges, ViewEncapsulation} from '@angular/core';
import { FormControl } from "@angular/forms";
import { MappingService } from "../../../services/mapping.service";
import { MappingModel } from "../../../models/mapping";
import { TutorialModel } from 'src/app/models/tutorial';
import { PlaygroundModule } from '../playground.module';

@Component({
  selector: 'playground-template',
  templateUrl: './playground-template.component.html',
  styleUrls: ['./playground-template.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PlaygroundTemplateComponent implements OnChanges {

  @Input() disabledArea: boolean;
  @Input() mapping: string;
  @Input() tutorialModel: TutorialModel;

  mappingControl: FormControl;
  mappingResults: string;
  mappingResultsSuccess: boolean;
  loadingMapping: boolean;

  private model: MappingModel =
    new MappingModel({ id: PlaygroundModule.mappingId, mappingProcessor: '', threads: 1, body: '' });

  constructor(private service : MappingService) {
    this.mappingControl = new FormControl({ value: '', disabled: false });
  }

  evaluateMapping() {
    this.model.body = this.mappingControl.value;
    this.model.mappingProcessor = this.tutorialModel ? this.tutorialModel.builder : null;
    this.loadingMapping = true;
    this.mappingResults = null;
    this.mappingResultsSuccess = null;
    this.service.add(this.model).subscribe({
      next: (v) => {
        this.mappingResults = '';
        this.service.dataValue(this.model.id).subscribe({
          next: (r) => {
            this.mappingResults = r.trim();
            this.mappingResultsSuccess = this.tutorialModel 
                ? this.tutorialModel.expected_result == r.trim()
                : true;
            this.loadingMapping = false;
          },
          error: (errorObtainedResults) => {
            this.mappingResults = JSON.stringify(errorObtainedResults)
            this.mappingResultsSuccess = false;
            this.loadingMapping = false;
          }
        });
      },
      error: (errorInAddMapping) => {
        if (JSON.parse(JSON.stringify(errorInAddMapping))['error']['message']) {
          this.mappingResults = JSON.parse(JSON.stringify(errorInAddMapping))['error']['message'];
        }
        else {
          this.mappingResults = JSON.parse(JSON.stringify(errorInAddMapping))['message'];
        }
        this.mappingResultsSuccess = false;
        this.loadingMapping = false;
      }
    });

  }

  resetTemplate() {
    this.mappingControl.setValue(this.tutorialModel.user_template);
  }

  solveTemplate() {
    this.mappingControl.setValue(this.tutorialModel.solution_template);
  }



  ngOnChanges(changes: SimpleChanges): void {
    if (changes) {
      if (changes['mapping']) {
        this.mappingControl.setValue(changes['mapping'].currentValue);
      }
      if (changes['tutorialModel']) {
        this.mappingControl.setValue(changes['tutorialModel'].currentValue.user_template);
      }
      if (changes['disabledArea']) {
        var val = this.mappingControl.value;
        this.mappingControl = new FormControl({ value: val, disabled: this.disabledArea != null && this.disabledArea });
      }
    }
  }
}
