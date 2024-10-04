import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {HttpClientModule} from '@angular/common/http';
import {MatNativeDateModule} from '@angular/material/core';
import { TableViewComponent } from './table-view/table-view.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import { TablesComponent } from './tables/tables.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatGridListModule} from '@angular/material/grid-list';
import {NgxPaginationModule, PaginatePipe} from 'ngx-pagination';
import { MatRadioModule} from '@angular/material/radio';
import { SearchComponent } from './search/search.component';
import { PaginatorComponent } from './paginator/paginator.component';

@NgModule({
  declarations: [
    AppComponent,
    TableViewComponent,
    TablesComponent,
    SearchComponent,
    PaginatorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatSortModule,
    MatTableModule,
    MatRadioModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatSortModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    NgxPaginationModule,
    MatGridListModule,
    MatSortModule,
    MatSelectModule
  ],
  providers: [PaginatePipe ],
  bootstrap: [AppComponent]
})
export class AppModule { }
