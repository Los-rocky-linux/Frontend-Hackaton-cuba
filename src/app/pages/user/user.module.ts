import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "../../shared/shared.module";
import { UserRoutingModule } from "./user-routing.module";

import { UserComponent } from "./pages/user/user.component";
import { TableUserComponent } from "./components/tables/table-user/table-user.component";
import { FormModalUserComponent } from './components/forms/form-modal-user/form-modal-user.component';
import { FormViewModalUserComponent } from './components/forms/form-view-modal-user/form-view-modal-user.component';

@NgModule({
  declarations: [UserComponent, TableUserComponent, FormModalUserComponent, FormViewModalUserComponent],
  imports: [CommonModule, SharedModule, UserRoutingModule],
})
export class UserModule {}
