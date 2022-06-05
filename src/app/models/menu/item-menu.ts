export class ItemMenuModel {
    
    private header: boolean;
    private icon: string;
    private title: string;
    private uri: string;
    private child: Array<ItemMenuModel>;

    constructor(icon: string, title: string, uri: string, header: boolean) {
        this.header = header;
        this.icon = icon;
        this.title = title;
        this.uri = uri;
        this.child = new Array();
    }

    public isHeader(): boolean {
        return this.header;
    }

    public setHeader(header: boolean): void {
        this.header = header;
    }

    public getIcon(): string {
        return this.icon;
    }

    public setIcon(icon: string): void {
        this.icon = icon;
    }

    public getTitle(): string {
        return this.title;
    }

    public setTitle(title: string): void {
        this.title = title;
    }

    public getUri(): string {
        return this.uri;
    }

    public setUri(uri: string): void {
        this.uri = uri;
    }

    public getChild(): Array<ItemMenuModel> {
        return this.child;
    }

    public setChild(child: Array<ItemMenuModel>): void {
        this.child = child;
    }

}