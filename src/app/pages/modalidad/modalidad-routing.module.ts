import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageModalidadComponent } from './pages/page-modalidad/page-modalidad.component';


const modalidadRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: PageModalidadComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(modalidadRoutes)],
  exports: [RouterModule],
})
export class ModalidadRoutingModule {}
