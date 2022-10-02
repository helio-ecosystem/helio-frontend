import { Component, Input, OnChanges, SimpleChanges, ViewEncapsulation} from '@angular/core';
import { FormControl } from "@angular/forms";
import { MappingService } from "../../../services/mapping.service";
import { MappingModel } from "../../../models/mapping";
import { TutorialModel } from 'src/app/models/tutorial';
import { PlaygroundModule } from '../playground.module';
import { ComponentService } from 'src/app/services/component.service';
import { BUILDER_TYPE } from 'src/app/shared/component-types';

@Component({
  selector: 'playground-template',
  templateUrl: './playground-template.component.html',
  styleUrls: ['./playground-template.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PlaygroundTemplateComponent implements OnChanges {

  @Input() isTour: boolean = false;
  @Input() disabledArea: boolean;
  @Input() mappingId: string;
  @Input() mapping: string;
  @Input() builder: string;
  @Input() tutorialModel: TutorialModel;

  private defaultBuilderType = 'Default';
  builderTypes = [this.defaultBuilderType];

  mappingControl: FormControl;
  builderControl: FormControl;
  mappingResults: string;
  mappingResultsSuccess: boolean;
  loadingMapping: boolean;

  private model: MappingModel =
    new MappingModel({ id: PlaygroundModule.mappingId, mappingProcessor: '', threads: 1, body: '' });

  constructor(
    private service : MappingService,
    private components: ComponentService)
  {
    this.mappingControl = new FormControl({ value: '', disabled: false });
    this.builderControl = new FormControl({ 
        value: this.builder ? this.builder : this.builderTypes[0],
        disabled: false
    });
    this.components.getComponentsByType(BUILDER_TYPE).subscribe({
      next: (v) => {
        this.builderTypes = v.map(c => c.clazz.split('.').pop());
        if (this.tutorialModel && this.builderTypes.findIndex(b => b == this.tutorialModel.builder) != -1) {
          this.builderControl.setValue(this.tutorialModel.builder);
        }
        else {
          this.builderControl.setValue(this.builderTypes[0]);
        }
      }
    });
  }

  evaluateMapping() {
    this.model.body = this.mappingControl.value;
    this.model.mappingProcessor = this.builderControl.value != this.defaultBuilderType ? this.builderControl.value : null;
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
      if (changes['builder']) {
        this.builderControl.setValue(changes['builder'].currentValue);
      }
      if (changes['mappingId']) {
        this.model.id = changes['mappingId'].currentValue;
      }
      if (changes['tutorialModel']) {
        this.mappingControl.setValue(changes['tutorialModel'].currentValue.user_template);
        this.tutorialModel && this.tutorialModel.builder ? this.tutorialModel.builder : this.builderTypes[0];
        if (this.tutorialModel.builder) {
          this.builderControl.setValue(this.tutorialModel.builder);
        }
      }
      if (changes['disabledArea']) {
        var val = this.mappingControl.value;
        this.mappingControl = new FormControl({ value: val, disabled: this.disabledArea != null && this.disabledArea });
      }
    }
  }
}
