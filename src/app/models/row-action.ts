export class RowActionModel {

    private _clazz: string;
    private _event: string;
    private _icon: string;

    constructor({ clazz, event, icon }) {
        this._clazz = clazz;
        this._event = event;
        this._icon = icon;
    }

  get clazz(): string {
    return this._clazz;
  }

  set clazz(value: string) {
    this._clazz = value;
  }

  get event(): string {
    return this._event;
  }

  set event(value: string) {
    this._event = value;
  }
  
  get icon(): string {
    return this._icon;
  }

  set icon(value: string) {
    this._icon = value;
  }

}