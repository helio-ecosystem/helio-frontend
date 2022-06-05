export class ComponentModel {
    
    private source: string;
    private clazz: string;
    private type: string;

    constructor({ source, clazz, type}) {
        this.source = source;
        this.clazz = clazz;
        this.type = type;
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

}