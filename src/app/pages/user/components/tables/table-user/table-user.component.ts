import { Component, OnInit } from "@angular/core";
import { UserService } from "../../../../../core/services/global/user.service";
import { USER_TABLE_COLUMNS } from "../../../../../core/constants/global/user.constant";
import { User } from "../../../../../core/interfaces/global/user.interface";

@Component({
  selector: "app-table-user",
  templateUrl: "./table-user.component.html",
  styleUrls: ["./table-user.component.scss"],
})
export class TableUserComponent implements OnInit {
  public isLoading = true;
  public tableColumns = USER_TABLE_COLUMNS;
  public tableData: User[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getAllUsers().subscribe((response) => {
      this.tableData = response.result;
      this.isLoading = false;
    });
  }

  deleteUser(id: string): void {
    this.userService.deleteUser(id).subscribe(() => {
      this.loadUsers();
    });
  }

  editUser(user: User): void {
    // Implementar la lógica de edición de usuario
  }
}
