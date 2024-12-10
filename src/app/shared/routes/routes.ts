import { Routes } from "@angular/router";

export const content: Routes = [
  {
    path: "management-schedule",
    loadChildren: () =>
      import("../../pages/management-schedule/management-schedule.module").then(
        (m) => m.ManagementScheduleModule
      ),
  },
  {
    path: "management-court",
    loadChildren: () =>
      import("../../pages/management-court/management-court.module").then(
        (m) => m.ManagementCourtModule
      ),
  },
  {
    path: "management-tutor",
    loadChildren: () =>
      import("../../pages/management-tutor/management-tutor.module").then(
        (m) => m.ManagementTutorModule
      ),
  },
  {
    path: "management-topic",
    loadChildren: () =>
      import("../../pages/management-topic/management-topic.module").then(
        (m) => m.ManagementTopicModule
      ),
  },
  {
    path: "user",
    loadChildren: () =>
      import("../../pages/user/user.module").then((m) => m.UserModule),
  },
  {
    path: "dashboard",
    loadChildren: () =>
      import("../../pages/dashboard/dashboard.module").then(
        (m) => m.DashboardModule
      ),
  },
  {
    path: "user",
    loadChildren: () =>
      import("../../pages/profile/profile.module").then((m) => m.ProfileModule),
  },
  {
    path: "modality",
    loadChildren: () =>
      import("../../pages/modalidad/modalidad.module").then(
        (m) => m.ModalidadModule
      ),
  },
  {
    path: "workshop",
    loadChildren: () =>
      import(
        "../../pages/workshop-registration/workshop-registration.module"
        ).then((m) => m.WorkshopRegistrationModule),
  },
  {
    path: "group",
    loadChildren: () =>
      import("../../pages/group/group.module").then((m) => m.GroupModule),
  },
  {
    path: "development-type",
    loadChildren: () =>
      import("../../pages/developmentType/development-type.module").then(
        (m) => m.DevelopmentTypeModule
      ),
  },
];
