export class TutorialModel {

    private _builder: string;
    private _description: string;
    private _user_template: string;
    private _solution_template: string;
    private _expected_result: string;
  
    constructor({ builder, description, user_template, solution_template, expected_result }) {
      this._builder = builder;
      this._description = description;
      this._user_template = user_template;
      this._solution_template = solution_template;
      this._expected_result = expected_result;
    }

    get builder(): string {
        return this._builder;
    }

    set builder(value: string) {
        this._builder = value;
    }
  
    get description(): string {
        return this._description;
    }

    set description(value: string) {
        this._description = value;
    }

    get user_template(): string {
        return this._user_template;
    }

    set user_template(value: string) {
        this._user_template = value;
    }

    get solution_template(): string {
        return this._solution_template;
    }

    set solution_template(value: string) {
        this._solution_template = value;
    }

    get expected_result(): string {
        return this._expected_result;
    }

    set expected_result(value: string) {
        this._expected_result = value;
    }
  
}