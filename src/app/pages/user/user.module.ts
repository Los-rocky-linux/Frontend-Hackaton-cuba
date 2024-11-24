import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "../../shared/shared.module";
import { UserRoutingModule } from "./user-routing.module";

import { UserComponent } from "./pages/user/user.component";
import { TableUserComponent } from "./components/tables/table-user/table-user.component";

@NgModule({
  declarations: [UserComponent, TableUserComponent],
  imports: [CommonModule, SharedModule, UserRoutingModule],
})
export class UserModule {}
