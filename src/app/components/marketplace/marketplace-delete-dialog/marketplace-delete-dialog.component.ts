import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ComponentModel } from 'src/app/models/component';
import { ComponentService } from 'src/app/services/component.service';

@Component({
    templateUrl: 'marketplace-delete-dialog.component.html',
    styleUrls: ['marketplace-delete-dialog.component.scss']
})
export class MarketplaceDeleteDialogComponent {

    component: ComponentModel;

    constructor(
        private dialog: MatDialogRef<MarketplaceDeleteDialogComponent>,
        private service: ComponentService,
        @Inject(MAT_DIALOG_DATA) private data: any)
    {
        this.component = data;
    }

    deleteComponent() {
        this.service.deleteComponent(this.component.id).subscribe({
            next: (v) => this.dialog.close({ status: 'ok', msg: this.component }),
            error: (e) => this.dialog.close({ status: 'error', msg: JSON.stringify(e) })
        });
    }

    cancel() {
        this.dialog.close();
    }


}
