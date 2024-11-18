import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from "../../shared/shared.module";
import { DevelopmentTypeRoutingModule } from './development-type-routing.module';
import { TableDevelopmentTypeComponent } from './components/tables/table-development-type/table-development-type.component';
import { PagesDevelopmentTypeComponent } from './pages/pages-development-type/pages-development-type.component';



@NgModule({
  declarations: [
    TableDevelopmentTypeComponent,
    PagesDevelopmentTypeComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    DevelopmentTypeRoutingModule
]
})
export class DevelopmentTypeModule { }
