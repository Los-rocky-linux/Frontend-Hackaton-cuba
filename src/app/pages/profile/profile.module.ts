import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { ProfileDetailComponent } from './pages/profile-detail/profile-detail.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { UserInfoComponent } from './components/info-user/user-info/user-info.component';



@NgModule({
  declarations: [
    ProfileDetailComponent,
    UserInfoComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ProfileRoutingModule 
  ]
})
export class ProfileModule { }
