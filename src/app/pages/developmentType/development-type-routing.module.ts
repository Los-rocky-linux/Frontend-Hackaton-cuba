import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagesDevelopmentTypeComponent } from './pages/pages-development-type/pages-development-type.component';

const developmentTypeRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: PagesDevelopmentTypeComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(developmentTypeRoutes)],
  exports: [RouterModule],
})
export class DevelopmentTypeRoutingModule {}
