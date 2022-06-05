import { Component } from '@angular/core';
import { ComponentModel } from 'src/app/models/component';
import { HelioService } from 'src/app/services/helio.service';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
    templateUrl: 'component-list.component.html',
    styleUrls: ['component-list.component.scss']
})
export class ComponentListComponent {

    columns = ['class', 'type', 'source'];
    data;
    error: string = '';
    
    constructor(private settings: SettingsService, private service: HelioService) {
        this.settings.setSection('Component list');
        this.search();
    }

    search() {
        this.error = '';
        this.service.componentList().subscribe({
           next: (v) => this.toTableData(v),
           error: (e) => this.error = 'Cannot retrieve component list'
        });
    }

    private toTableData(sourceData: any[]) {
        this.data = [];
        sourceData.forEach(s => { 
            var d: ComponentModel = new ComponentModel(JSON.parse(JSON.stringify(s)));
            this.data.push([d.getClazz(), d.getType(), d.getSource()]); 
        });
    }

}
