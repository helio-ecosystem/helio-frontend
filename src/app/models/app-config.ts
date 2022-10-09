export class AppConfigModel {

  private _host: string;
  private _mode: string;

  constructor({ host, mode }) {
    this._host = host;
    this._mode = mode;
  }

  get host(): string {
    return this._host;
  }

  set host(value: string) {
    this._host = value;
  }

  get mode(): string {
    return this._mode;
  }

  set mode(value: string) {
    this._mode = value;
  }

}
