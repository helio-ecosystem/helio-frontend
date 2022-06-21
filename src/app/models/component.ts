export class ComponentModel {

    private _name: string;
    private _source: string;
    private _clazz: string;
    private _type: string;

    constructor({ source, clazz, type }) {
        this._source = source;
        this._clazz = clazz;
        this._type = type;
        // Extract repository name by regex
        //this._name = source.match('^.*\\/helio-ecosystem\\/([^\\/]*).*$')[1];
        this._name = source.match('([a-zA-Z|\-]+)-.*$')[1].replaceAll('-', ' ');
    }




  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get source(): string {
    return this._source;
  }

  set source(value: string) {
    this._source = value;
  }

  get clazz(): string {
    return this._clazz;
  }

  set clazz(value: string) {
    this._clazz = value;
  }

  get type(): string {
    return this._type;
  }

  set type(value: string) {
    this._type = value;
  }

  /*
    public getName(): string {
        return this.name;
    }

    public setName(name: string): void {
        this.name = name;
    }

    public getSource(): string {
        return this.source;
    }

    public setSource(source: string): void {
        this.source = source;
    }

    public getClazz(): string {
        return this.clazz;
    }

    public setClazz(clazz: string): void {
        this.clazz = clazz;
    }

    public getType(): string {
        return this.type;
    }

    public setType(type: string): void {
        this.type = type;
    }
*/
}
