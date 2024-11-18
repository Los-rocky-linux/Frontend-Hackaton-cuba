import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageModalidadComponent } from './pages/page-modalidad/page-modalidad.component';
import { TableModalidadComponent } from './components/tables/table-modalidad/table-modalidad.component';
import { SharedModule } from '../../shared/shared.module';
import { ModalidadRoutingModule } from './modalidad-routing.module';
import { FormModalidadComponent } from './components/forms/form-modalidad/form-modalidad.component';
import { ViewEnrollmentComponent } from './components/forms/view-enrollment/view-enrollment.component';

@NgModule({
  declarations: [
    PageModalidadComponent, 
    TableModalidadComponent, 
    FormModalidadComponent, 
    ViewEnrollmentComponent,
],
  imports: [
    CommonModule,
    SharedModule,
    ModalidadRoutingModule,
    
  ],
})
export class ModalidadModule {}
