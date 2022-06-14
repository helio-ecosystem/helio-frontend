export class TranslationModel {

    private id: string;
    private mappingProcessor: string;
    private threads: number;
    private body: string;

    constructor({ id, mappingProcessor, threads, body }) {
        this.id = id;
        this.mappingProcessor = mappingProcessor;
        this.threads = threads;
        this.body = body;
    }

    public getId(): string {
      return this.id;
    }

    public setId(id: string): void {
      this.id = id;
    }

    public getMappingProcessor(): string {
      return this.mappingProcessor;
    }

    public setMappingProcessor(mappingProcessor: string): void {
      this.mappingProcessor = mappingProcessor;
    }

    public getThreads(): number {
      return this.threads;
    }

    public setThreads(threads: number): void {
      this.threads = threads;
    }

    public getBody(): string {
      return this.body;
    }

    public setBody(body: string): void {
      this.body = body;
    }

}
