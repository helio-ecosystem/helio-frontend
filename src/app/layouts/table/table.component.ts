import {AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { TableDataSource } from './table-datasource';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit, AfterViewInit, OnChanges {
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<any>;
  dataSource: TableDataSource;

  @Input() columns;
  @Input() data;

  @Output() rowClick = new EventEmitter<any>();

  ngOnInit() {
    this.dataSource = new TableDataSource(this.data);
  }

  
  ngOnChanges(changes: SimpleChanges): void {
    if (this.table && changes['data']) {
      this.dataSource = new TableDataSource(changes['data'].currentValue);
      this.setupTable();
    }
  }

  ngAfterViewInit(): void {
    this.setupTable();
  }

  private setupTable() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  onRowClicked(row: any): void {
    this.rowClick.emit(row);
  }

}
