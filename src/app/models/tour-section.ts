export class TourSectionModel {

    private _sectionId: string;
    private _name: string;
    private _description: string;
    private _translation: string;
    private _resultTranslation: string;

    constructor({ sectionId, name, description, translation, resultTranslation }) {
        this._sectionId = sectionId;
        this._name = name;
        this._description = description;
        this._translation = translation;
        this._resultTranslation = resultTranslation;
    }

    get sectionId(): string {
      return this._sectionId;
    }

    set sectionId(value: string) {
      this._sectionId = value;
    }

    get name(): string {
      return this._name;
    }

    set name(value: string) {
      this._name = value;
    }

    get description(): string {
      return this._description;
    }

    set description(value: string) {
      this._description = value;
    }

    get translation(): string {
      return this._translation;
    }

    set translation(value: string) {
      this._translation = value;
    }

    get resultTranslation(): string {
      return this._resultTranslation;
    }

    set resultTranslation(value: string) {
      this._resultTranslation = value;
    }

}
