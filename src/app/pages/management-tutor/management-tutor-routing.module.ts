import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ManagementTutorComponent } from "./pages/management-tutor/management-tutor.component";

const managementTutorRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "",
        component: ManagementTutorComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(managementTutorRoutes)],
  exports: [RouterModule],
})
export class ManagementTutorRoutingModule {}
