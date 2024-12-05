import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NgSelectModule } from "@ng-select/ng-select";
import { SharedModule } from "../../shared/shared.module";
import { ManagementScheduleComponent } from './pages/management-schedule/management-schedule.component';
import { ManagementScheduleRoutingModule } from "./management-routing.module";
import { ManagementScheduleFilterComponent } from "./components/filters/management-schedule-filter/management-schedule-filter.component";
import { ManagementScheduleFormModalComponent } from './components/forms/management-schedule-form-modal/management-schedule-form-modal.component';
import { ManagementScheduleFormModalViewComponent } from './components/forms/management-schedule-form-modal-view/management-schedule-form-modal-view.component';
import { ManagementScheduleTableComponent } from './components/tables/management-schedule-table/management-schedule-table.component';

@NgModule({
  declarations: [
    ManagementScheduleComponent,
    ManagementScheduleFilterComponent,
    ManagementScheduleFormModalComponent,
    ManagementScheduleFormModalViewComponent,
    ManagementScheduleTableComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgSelectModule,
    SharedModule,
    ManagementScheduleRoutingModule
  ]
})
export class ManagementScheduleModule { }
