import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageWorkshopRegistrationComponent } from './pages/page-workshop-registration/page-workshop-registration.component';


const workshopRegistrationRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: PageWorkshopRegistrationComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(workshopRegistrationRoutes)],
  exports: [RouterModule],
})
export class WorkshopRegistrationRoutingModule {}
