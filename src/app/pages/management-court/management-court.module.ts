import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NgSelectModule } from "@ng-select/ng-select";
import { SharedModule } from "../../shared/shared.module";
import { ManagementCourtRoutingModule } from "./management-court-routing.module";
import { ManagementCourtComponent } from "./pages/management-court/management-court.component";
import { ManagementCourtTableComponent } from './components/tables/management-court-table/management-court-table.component';
import { ManagementCourtFormModalComponent } from './components/forms/management-court-form-modal/management-court-form-modal.component';
import { ManagementCourtFilterComponent } from './components/filter/management-court-filter/management-court-filter.component';

@NgModule({
  declarations: [ManagementCourtComponent, ManagementCourtTableComponent, ManagementCourtFormModalComponent, ManagementCourtFilterComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgSelectModule,
    SharedModule,
    ManagementCourtRoutingModule,
  ],
})
export class ManagementCourtModule {}
