import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MappingService } from 'src/app/services/mapping.service';

@Component({
    templateUrl: 'mapping-detele-dialog.component.html',
    styleUrls: ['mapping-detele-dialog.component.scss']
})
export class MappingDeteleDialogComponent {

    mappingId;

    constructor(
        private dialog: MatDialogRef<MappingDeteleDialogComponent>,
        private service: MappingService,
        @Inject(MAT_DIALOG_DATA) private data: any) {
        this.mappingId = data.mappingId;
    }

    public accept() {
        this.service.remove(this.mappingId).subscribe({
            next: (v) => this.dialog.close({ status: 'ok', data: this.mappingId }),
            error: (e) => this.dialog.close({ status: 'error', data: JSON.stringify(e) })
        });
    }

    public cancel(): void {
        this.dialog.close();
    }

}
