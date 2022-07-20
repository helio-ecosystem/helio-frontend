import { RowActionModel } from "./row-action";

export class TableSourceModel {

    private _columns: string[];
    private _rows: any[];
    private _actions: RowActionModel[];
    private _page_size: number;

  get columns(): string[] {
    return this._columns;
  }

  set columns(value: string[]) {
    this._columns = value;
  }

  get rows(): any[] {
    return this._rows;
  }

  set rows(value: any[]) {
    this._rows = value;
  }
  
  get actions(): RowActionModel[] {
    return this._actions;
  }

  set actions(value: RowActionModel[]) {
    this._actions = value;
  }

  get pageSize(): number {
    return this._page_size;
  }

  set pageSize(value: number) {
    this._page_size = value;
  }

}