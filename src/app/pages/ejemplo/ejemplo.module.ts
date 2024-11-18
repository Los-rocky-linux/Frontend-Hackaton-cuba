import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormEjemploComponent } from './components/forms/form-ejemplo/form-ejemplo.component';
import { FilterEjemploComponent } from './components/filters/filter-ejemplo/filter-ejemplo.component';
import { TableEjemploComponent } from './components/tables/table-ejemplo/table-ejemplo.component';
import { PageEjemploComponent } from './pages/page-ejemplo/page-ejemplo.component';
import { EjemploRoutingModule } from './ejemplo-routing.module';
import { SharedModule } from '../../shared/shared.module';



@NgModule({
  declarations: [
    FormEjemploComponent,
    FilterEjemploComponent,
    TableEjemploComponent,
    PageEjemploComponent,
    
  ],
  imports: [
    CommonModule,
    EjemploRoutingModule,
    SharedModule
  ]
})
export class EjemploModule { }
