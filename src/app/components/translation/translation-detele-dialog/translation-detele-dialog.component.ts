import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslationService } from 'src/app/services/translation.service';

@Component({
    templateUrl: 'translation-detele-dialog.component.html',
    styleUrls: ['translation-detele-dialog.component.scss']
})
export class TranslationDeteleDialogComponent {

    translationId;

    constructor(
        private dialog: MatDialogRef<TranslationDeteleDialogComponent>,
        private service: TranslationService,
        @Inject(MAT_DIALOG_DATA) private data: any) {
        this.translationId = data.translationId;
    }

    public accept() {
        this.service.remove(this.translationId).subscribe({
            next: (v) => this.dialog.close({ status: 'ok', data: this.translationId }),
            error: (e) => this.dialog.close({ status: 'error', data: JSON.stringify(e) })
        });
    }

    public cancel(): void {
        this.dialog.close();
    }

}
