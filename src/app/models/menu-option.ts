export class MenuOptionModel {

    private _icon: string;
    private _title: string;
    private _uri: string;
    private _child: Array<MenuOptionModel>;

    constructor(icon: string, title: string, uri: string) {
        this._icon = icon;
        this._title = title;
        this._uri = uri;
        this._child = new Array();
    }

    get icon(): string {
        return this._icon;
    }

    set icon(value: string) {
        this._icon = value;
    }

    get title(): string {
        return this._title;
    }

    set title(value: string) {
        this._title = value;
    }

    get uri(): string {
        return this._uri;
    }

    set uri(value: string) {
        this._uri = value;
    }

    get child(): Array<MenuOptionModel> {
        return this._child;
    }

    set child(value: Array<MenuOptionModel>) {
        this._child = value;
    }

    public addChild(value: MenuOptionModel) {
        this._child.push(value);
    }

    public removeChild(value: MenuOptionModel) {
        this._child = this._child
            .filter(o => o._title === value._title && o.uri === value._uri);
    }

}