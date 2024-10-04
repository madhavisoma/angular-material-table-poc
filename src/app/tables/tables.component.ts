import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {PeriodicElement} from '../data.interface';
import {PaginatePipe} from 'ngx-pagination';
import {MatSort, Sort} from '@angular/material/sort';
import {AksService} from '../aks.service';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss']
})
export class TablesComponent implements OnInit, AfterViewInit {

  collection = {count: 60, data: []};
  config: any;

  public maxSize = 7;
  public directionLinks = true;
  public autoHide = false;
  public responsive = true;
  public labels: any = {
    previousLabel: '<--',
    nextLabel: '-->',
    screenReaderPaginationLabel: 'Pagination',
    screenReaderPageLabel: 'page',
    screenReaderCurrentLabel: `You're on page`
  };


  selectedUser: any;

  prev = '';
  next = '';
  pageCount: any = [10, 30, 60, 100];
  selectedCount = 100;
  searchValue: string;
  isTable2 = false;
  isTable3 = false;
  pageIndex: number;
  count = 120;
  updatedData;
  splittedData = new Array<PeriodicElement[]>(3);
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  dataSource: MatTableDataSource<PeriodicElement>;

  constructor(private paginate: PaginatePipe, private aks: AksService) {

    for (var i = 0; i < this.collection.count; i++) {
      this.collection.data.push(
        {
          id: i + 1,
          value: 'items number ' + (i + 1)
        }
      );
    }

    this.increaseData();
    this.config = {
      itemsPerPage: this.selectedCount,
      currentPage: 1
    };
    const x = this.paginate.transform(this.dataSource.filteredData, this.config);
    console.log(x);

  }

  onPageChange(event) {
    console.log(event);
    // this.config.currentPage = event;
  }

  pageChanged(event) {
    this.config = {
      itemsPerPage: this.selectedCount,
      currentPage: event
    };
    this.updatedData = this.paginate.transform(this.dataSource.filteredData, this.config);
    console.log(this.paginate);
    this.appendData();
  }


  applySort(sort: MatSort) {
    const data = this.searchValue === '' ? this.dataSource.data : this.dataSource.filteredData;
    const filterData = data.filter(user => user.position !== this.selectedUser[0].position);
    const sortDatasource = new MatTableDataSource<PeriodicElement>(filterData);
    sortDatasource.sortData(filterData, sort);
    this.dataSource.data = [this.selectedUser[0], ...sortDatasource.data];
    this.updatedData = this.dataSource.data;
    this.appendData();
  }

  ngAfterViewInit() {
      /*  this.sort.active = 'position';
      this.sort.start = 'desc';
      this.dataSource.sort = this.sort;
      this.dataSource.sort = this.sort;*/
  }

  appendData() {
    switch (this.selectedCount) {
      case 30:
        this.splittedData[0] = this.updatedData.slice(0, 10);
        this.splittedData[1] = this.updatedData.slice(10, 20);
        this.splittedData[2] = this.updatedData.slice(20, 30);
        break;
      case 60:
        this.splittedData[0] = this.updatedData.slice(0, 20);
        this.splittedData[1] = this.updatedData.slice(20, 40);
        this.splittedData[2] = this.updatedData.slice(40, 60);
        break;
      case 100:
        this.splittedData[0] = this.updatedData.slice(0, 34);
        this.splittedData[1] = this.updatedData.slice(34, 67);
        this.splittedData[2] = this.updatedData.slice(67, 100);
        break;
      default:
        this.splittedData[0] = this.updatedData.slice(0, 10);
        break;
    }

    this.isTable2 = this.splittedData[1]?.length > 1 ? true : false;
    this.isTable3 = this.splittedData[2]?.length > 1 ? true : false;
    if (this.selectedCount === 10) {
      this.isTable2 = false;
      this.isTable3 = false;
    }
    this.selectedUser = this.updatedData.filter(user => user.position == 1);
    this.aks.selectedProfile.next(this.selectedUser[0].position);

  }

  // tslint:disable-next-line:typedef
  applyFilter(searchValue) {
    const data = this.dataSource.filteredData.filter(user => user.position !== this.selectedUser.position);
    this.dataSource = new MatTableDataSource<PeriodicElement>(data);
    this.dataSource.filter = searchValue.trim().toLowerCase();
    this.updatedData = [this.selectedUser[0], ...this.dataSource.filteredData];
    this.selectPage(1);
  }

  freshPagination() {
    this.config = {
      itemsPerPage: this.selectedCount,
      currentPage: 1
    };
    this.selectPage(1);
    //  this.updatedData = this.paginate.transform(this.dataSource.filteredData, this.config);
  }


  ngOnInit(): void {
    this.aks.searchProfile.subscribe(val => {
      if (val !== undefined) {
        this.applyFilter(val);
      }
    });
  }

  selectPage(page: number) {
    const data = this.dataSource.data.slice(
      (page - 1) * this.selectedCount,
      page * this.selectedCount
    );
    const tempDataSource = new MatTableDataSource(data);
    this.updatedData = tempDataSource.filteredData;
    this.appendData();
  }

  increaseData() {
    const data: PeriodicElement[] = [];
    for (let line = 0; line < this.count; line++) {
      data.push({position: line + 1, name: line + 1 + '_Name'});
    }
    this.dataSource = new MatTableDataSource(data);

    this.updatedData = this.dataSource.data;
    this.config = {
      itemsPerPage: this.selectedCount,
      currentPage: 1
    };
    this.dataSource.connect().subscribe(d => {
      this.updatedData = d;
      this.appendData();
    });

    this.updatedData = this.paginate.transform(this.dataSource.filteredData, this.config);
    console.log(this.paginate);
    this.appendData();

  }
}

const StartIndex = {
  10: 0,
  30: 20,
  60: 30,
  100: 100,
};
const EndIndex = {
  10: 10,
  30: 20,
  60: 30,
  100: 100,
};
