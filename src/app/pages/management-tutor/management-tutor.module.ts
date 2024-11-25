// librerias y demas cosas
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NgSelectModule } from "@ng-select/ng-select";
import { SharedModule } from "../../shared/shared.module";
import { ManagementTutorRoutingModule } from "./management-tutor-routing.module";
//components
import { ManagementTutorComponent } from './pages/management-tutor/management-tutor.component';
import { TableManagementTutorComponent } from './components/tables/table-management-tutor/table-management-tutor.component';
import { FormModalManagementTutorComponent } from './components/forms/form-modal-management-tutor/form-modal-management-tutor.component';
import { FilterManagementTutorComponent } from './components/filter/filter-management-tutor/filter-management-tutor.component';
import { FormViewModalManagementTutorComponent } from './components/forms/form-view-modal-management-tutor/form-view-modal-management-tutor.component';

@NgModule({
  declarations: [
    ManagementTutorComponent,
    TableManagementTutorComponent,
    FormModalManagementTutorComponent,
    FilterManagementTutorComponent,
    FormViewModalManagementTutorComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgSelectModule,
    SharedModule,
    ManagementTutorRoutingModule
  ],
})
export class ManagementTutorModule {}
