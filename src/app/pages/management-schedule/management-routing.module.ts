import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ManagementScheduleComponent } from "./pages/management-schedule/management-schedule.component";

const managementSheduleRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "",
        component: ManagementScheduleComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(managementSheduleRoutes)],
  exports: [RouterModule],
})
export class ManagementScheduleRoutingModule {}
