import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ManagementCourtComponent } from "./pages/management-court/management-court.component";

const managementCourtRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "",
        component: ManagementCourtComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(managementCourtRoutes)],
  exports: [RouterModule],
})
export class ManagementCourtRoutingModule {}
