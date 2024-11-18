import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageGroupComponent } from './pages/page-group/page-group.component';

const groupRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: PageGroupComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(groupRoutes)],
  exports: [RouterModule],
})
export class GroupRoutingModule {}
