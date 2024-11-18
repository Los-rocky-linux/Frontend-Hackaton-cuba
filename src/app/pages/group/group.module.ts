import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageGroupComponent } from './pages/page-group/page-group.component';
import { TableGroupComponent } from './components/tables/table-group/table-group.component';
import { GroupRoutingModule } from './group-routing.module';
import { SharedModule } from "../../shared/shared.module";
import { ViewGroupComponent } from './components/forms/view-group/view-group/view-group.component';



@NgModule({
  declarations: [
    PageGroupComponent,
    TableGroupComponent,
    ViewGroupComponent
  ],
  imports: [
    CommonModule,
    GroupRoutingModule,
    SharedModule
]
})
export class GroupModule { }
