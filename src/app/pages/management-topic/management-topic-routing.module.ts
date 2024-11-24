import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ManagementTopicComponent } from "./pages/management-topic/management-topic.component";

const managementTopicRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "",
        component: ManagementTopicComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(managementTopicRoutes)],
  exports: [RouterModule],
})
export class ManagementTopicRoutingModule {}