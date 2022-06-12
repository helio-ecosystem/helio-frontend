export class TranslationModel {

    private id: string;
    private body: string;

    constructor({ id, body }) {
        this.id = id;
        this.body = body;
    }

    public getId(): string {
      return this.id;
    }

    public setId(id: string): void {
      this.id = id;
    }

    public getBody(): string {
      return this.body;
    }

    public setBody(body: string): void {
      this.body = body;
    }

}
