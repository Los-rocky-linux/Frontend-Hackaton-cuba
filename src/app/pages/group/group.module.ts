import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageGroupComponent } from './pages/page-group/page-group.component';
import { TableGroupComponent } from './components/tables/table-group/table-group.component';
import { GroupRoutingModule } from './group-routing.module';
import { SharedModule } from "../../shared/shared.module";
import { ViewGroupComponent } from './components/forms/view-group/view-group/view-group.component';
import { FilterGroupComponent } from './components/filters/filter-group/filter-group.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    PageGroupComponent,
    TableGroupComponent,
    ViewGroupComponent,
    FilterGroupComponent
  ],
  imports: [
    CommonModule,
    GroupRoutingModule,
    SharedModule,
    NgSelectModule,
    BsDatepickerModule.forRoot(),
    ReactiveFormsModule,
    FormsModule,
]
})
export class GroupModule { }
