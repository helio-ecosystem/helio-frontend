import { Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import { FormControl } from "@angular/forms";
import { MappingService } from "../../../services/mapping.service";
import { MappingModel } from "../../../models/mapping";
import { TourSectionModel } from "../../../models/tour-section";
import { TourService } from "../../../services/tour.service";

@Component({
  selector: 'playground-template',
  templateUrl: './playground-template.component.html',
  styleUrls: ['./playground-template.component.css']
})
export class PlaygroundTemplateComponent implements OnChanges {

  @Input() disabledArea: boolean;
  @Input() mapping: string;
  @Input() sectionModel: TourSectionModel;

  mappingControl: FormControl;
  mappingResults: string;
  mappingResultsSuccess: boolean;
  loadingMapping: boolean;

  private model: MappingModel =
    new MappingModel({ id: TourService.playground_mapping_id, mappingProcessor: '', threads: 1, body: '' });

  constructor(private service : MappingService) {
    this.mappingControl = new FormControl({ value: '', disabled: false });
  }

  evaluateMapping() {
    this.model.body = this.mappingControl.value;
    this.loadingMapping = true;
    this.mappingResults = null;
    this.mappingResultsSuccess = null;
    this.service.add(this.model).subscribe({
      next: (v) => {
        this.mappingResults = '';
        this.service.dataValue(this.model.id).subscribe({
          next: (r) => {
            this.mappingResults = r.trim();
            this.mappingResultsSuccess = true;
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

  ngOnChanges(changes: SimpleChanges): void {
    if (changes) {
      if (changes['mapping']) {
        this.mappingControl.setValue(changes['mapping'].currentValue);
      }
      if (changes['sectionModel']) {
        this.mappingControl.setValue(changes['sectionModel'].currentValue._translation);
      }
      if (changes['disabledArea']) {
        var val = this.mappingControl.value;
        this.mappingControl = new FormControl({ value: val, disabled: this.disabledArea != null && this.disabledArea });
      }
    }
  }
}
