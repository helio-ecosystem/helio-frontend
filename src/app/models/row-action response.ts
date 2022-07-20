export class RowResponseModel {

    private _event: string;
    private _row: any;

    constructor(event, row) {
        this._event = event;
        this._row = row;
    }

  get event(): string {
    return this._event;
  }

  get row(): any {
    return this._row;
  }

}