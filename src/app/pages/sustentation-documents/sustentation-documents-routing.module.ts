import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SustentationDocumentsComponent} from './pages/sustentation/sustentation-documents.component';

const routes: Routes = [
  {
    path: "",
    children: [
      {
        path: "",
        component: SustentationDocumentsComponent,
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SustentationDocumentsRoutingModule { }
