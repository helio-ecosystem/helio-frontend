export class MappingModel {

  private _id: string;
  private _mappingProcessor: string;
  private _threads: number;
  private _body: string;

  constructor({ id, mappingProcessor, threads, body }) {
    this._id = id;
    this._mappingProcessor = mappingProcessor;
    this._threads = threads;
    this._body = body;
  }

  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }

  get mappingProcessor(): string {
    return this._mappingProcessor;
  }

  set mappingProcessor(value: string) {
    this._mappingProcessor = value;
  }

  get threads(): number {
    return this._threads;
  }

  set threads(value: number) {
    this._threads = value;
  }

  get body(): string {
    return this._body;
  }

  set body(value: string) {
    this._body = value;
  }

}
