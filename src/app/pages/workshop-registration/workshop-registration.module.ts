import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageWorkshopRegistrationComponent } from './pages/page-workshop-registration/page-workshop-registration.component';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgSelectModule } from '@ng-select/ng-select';
import { TableWorkshopRegistrationComponent } from './components/tables/table-workshop-registration/table-workshop-registration.component';
import { WorkshopRegistrationRoutingModule } from './workshop-registration-routing.module';
import { CreateEditWorkshopRegistrationComponent } from './components/forms/create-edit-workshop-registration/create-edit-workshop-registration.component';
import { ViewWorkshopRegistrationComponent } from './components/forms/view-workshop-registration/view-workshop-registration/view-workshop-registration.component';



@NgModule({
  declarations: [
    PageWorkshopRegistrationComponent,
    TableWorkshopRegistrationComponent,
    CreateEditWorkshopRegistrationComponent,
    ViewWorkshopRegistrationComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    NgSelectModule,
    BsDatepickerModule.forRoot(),
    ReactiveFormsModule,
    FormsModule,
    WorkshopRegistrationRoutingModule
  ]
})
export class WorkshopRegistrationModule { }
