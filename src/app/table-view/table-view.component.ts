import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {AksService} from '../aks.service';

@Component({
  selector: 'app-table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.scss']
})
export class TableViewComponent implements OnInit, AfterViewInit {
  @Input() dataSource;
  @Input() isIcons;

  selection: number;
  defalutSelcted = '';
  positionSortOrder = false;
  nameSortOrder = false;
  isSort = false;

  displayedColumns: string[] = ['position', 'name'];
  @Output() emitSort: EventEmitter<MatSort> = new EventEmitter<MatSort>();

  constructor(private aks: AksService) {
  }

  @ViewChild(MatSort) sort: MatSort;
  data: any;
  renderedData;

  ngOnInit(): void {
    this.aks.selectedProfile.subscribe(val => {
      this.defalutSelcted = val;
    });
    this.data = new MatTableDataSource(this.dataSource);
    this.data.connect().subscribe(d => {
      this.renderedData = d;
      console.log(this.renderedData);
    });

  }

  changeSelectedId(val) {
    this.aks.selectedProfile.next(val);
  }

  customSort(active) {
    if (this.isIcons) {
      this.isSort = active === 'position' ? false : true;
      if (active === 'position') {
        this.sort.direction = this.positionSortOrder ? 'asc' : 'desc';
        this.positionSortOrder = !this.positionSortOrder;
      }
      if (active === 'name') {
        this.sort.direction = this.nameSortOrder ? 'asc' : 'desc';
        this.nameSortOrder = !this.nameSortOrder;
      }
      this.sort.active = active;
      this.emitSort.emit(this.sort);
    }

  }

  sortData(event) {
    this.sort.active = event.active;
    this.sort.start = event.position;
    this.data.sort = this.sort;
    this.emitSort.emit(this.sort);
  }

  ngAfterViewInit() {
    this.data.sort = this.sort;
  }

}
