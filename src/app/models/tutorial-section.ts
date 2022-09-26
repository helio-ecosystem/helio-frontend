export class TutorialSection {

    private _name: string;
    private _path: string;
    private _child: TutorialSection[]

    constructor() {
        this._child = [];
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get path(): string {
        return this._path;
    }

    set path(value: string) {
        this._path = value;
    }

    get child(): TutorialSection[] {
        return this._child;
    }

    public addChild(value: TutorialSection) {
        this._child.push(value);
    }

}