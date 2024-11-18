import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageEjemploComponent } from './pages/page-ejemplo/page-ejemplo.component';

const ejemploRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: PageEjemploComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(ejemploRoutes)],
  exports: [RouterModule],
})
export class EjemploRoutingModule {}
