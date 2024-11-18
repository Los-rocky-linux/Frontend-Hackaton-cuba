import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileDetailComponent } from './pages/profile-detail/profile-detail.component';

const profileRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'profile',
        component: ProfileDetailComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(profileRoutes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule {}
