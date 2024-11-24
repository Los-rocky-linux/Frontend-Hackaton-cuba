import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NgSelectModule } from "@ng-select/ng-select";

import { ManagementTopicComponent } from "./pages/management-topic/management-topic.component";
import { TableManagementTopicComponent } from "./components/tables/table-management-topic/table-management-topic.component";

import { SharedModule } from "../../shared/shared.module";
import { ManagementTopicRoutingModule } from "./management-topic-routing.module";
import { FormModalManagementTopicComponent } from "./components/forms/form-modal-management-topic/form-modal-management-topic.component";
import { FilterManagementTopicComponent } from "./components/filter/filter-management-topic/filter-management-topic.component";
import { FormViewModalManagementTopicComponent } from './components/forms/form-view-modal-management-topic/form-view-modal-management-topic.component';

@NgModule({
  declarations: [
    ManagementTopicComponent,
    TableManagementTopicComponent,
    FormModalManagementTopicComponent,
    FilterManagementTopicComponent,
    FormViewModalManagementTopicComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgSelectModule,
    ManagementTopicRoutingModule,
    SharedModule,
  ],
})
export class ManagementTopicModule {}
