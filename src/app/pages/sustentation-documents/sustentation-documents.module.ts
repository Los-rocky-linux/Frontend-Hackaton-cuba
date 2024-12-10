import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SustentationDocumentsRoutingModule } from './sustentation-documents-routing.module';
import { FormModalSustentationComponent } from './components/forms/sustentation-documents-form-modal/sustentation-documents-form-modal.component';
import { FormViewModalSustentationComponent } from './components/forms/sustentation-documents-form-modal-view/sustentation-documents-form-modal-view.component';
import { TableSustentationDocumentsComponent } from './components/tables/sustentation-documents-table/sustentation-documents-table.component';
import { SustentationDocumentsComponent } from './pages/sustentation/sustentation-documents.component';
import {SharedModule} from '../../shared/shared.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NgSelectModule} from '@ng-select/ng-select';


@NgModule({
  declarations: [
    FormModalSustentationComponent,
    FormViewModalSustentationComponent,
    TableSustentationDocumentsComponent,
    SustentationDocumentsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgSelectModule,
    CommonModule,
    SharedModule,
    SustentationDocumentsRoutingModule
  ]
})
export class SustentationDocumentsModule { }
