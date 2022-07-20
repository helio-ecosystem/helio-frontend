import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { RowActionModel } from 'src/app/models/row-action';
import { RowResponseModel } from 'src/app/models/row-action response';
import { TableSourceModel } from 'src/app/models/table-source';

@Component({
    selector: 'table-simple',
    templateUrl: 'table-simple.component.html',
    styleUrls: ['table-simple.component.scss']
})
export class TableSimpleComponent implements OnInit, OnChanges {
    
  @Input() columns;
  @Input() actions: RowActionModel[];
  @Input() data;

  @Output() rowActionClick = new EventEmitter<RowResponseModel>();


  table: TableSourceModel;
  dataFiltered: any[];
  currentPage = 0;

  filterControl: FormControl = new FormControl();

  constructor() {
    this.table = new TableSourceModel();
    this.table.pageSize = 10;
    this.filterControl = new FormControl();
    this.filterControl.valueChanges.subscribe({
      next: (v) => this.filterData(v)
    });
  }

  ngOnInit(): void {
    this.table.columns = this.columns;
    this.dataFiltered = this.data;
    this.table.actions = this.actions;
    this.loadDataInTable();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.table && changes['data']) {
      this.dataFiltered = changes['data'].currentValue;
      this.loadDataInTable();
    }
  }


  private loadDataInTable() {
    this.table.rows = this.dataFiltered.slice(
      this.table.pageSize * this.currentPage,
      this.table.pageSize * (this.currentPage + 1));
  }

  private filterData(filter) {
    this.dataFiltered = this.data.filter(row => row[0].includes(filter));
    this.currentPage = 0;
    this.loadDataInTable();
  }

  onPageChange(page: any) {
    this.currentPage = page.pageIndex;
    this.table.pageSize = page.pageSize;
    this.loadDataInTable();
  }

  onActionClicked(row: any, event: any): void {
    this.rowActionClick.emit(new RowResponseModel(event, row));
  }

}
