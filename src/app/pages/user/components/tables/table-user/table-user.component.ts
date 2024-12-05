import { Component, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { UserService } from "../../../../../core/services/global/user.service";
import { USER_TABLE_COLUMNS } from "../../../../../core/constants/global/user.constant";
import { User } from "../../../../../core/interfaces/global/user.interface";
import { FormModalUserComponent } from "../../forms/form-modal-user/form-modal-user.component";
import { FormViewModalUserComponent } from "../../forms/form-view-modal-user/form-view-modal-user.component";
import Swal from "sweetalert2";

@Component({
  selector: "app-table-user",
  templateUrl: "./table-user.component.html",
  styleUrls: ["./table-user.component.scss"],
})
export class TableUserComponent implements OnInit {
  public isLoading = true;
  public tableColumns = USER_TABLE_COLUMNS;
  public tableData: User[] = [];
  public page = 1;
  public limit = 10;

  constructor(
    private userService: UserService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.isLoading = true;
    this.userService
      .getAllUsers(this.page, this.limit)
      .subscribe((response) => {
        this.tableData = response.result;
        this.isLoading = false;
      });
  }

  deleteUser(id: string): void {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¡No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, borrar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteUser(id).subscribe(() => {
          this.loadUsers();
          Swal.fire("¡Borrado!", "El usuario ha sido borrado.", "success");
        });
      }
    });
  }

  openModal(user?: User): void {
    const modalRef = this.modalService.open(FormModalUserComponent);
    modalRef.componentInstance.user = user;

    modalRef.componentInstance.save.subscribe((result: User) => {
      if (user) {
        this.userService.updateUser(user.id, result).subscribe(() => {
          this.loadUsers();
          Swal.fire(
            "¡Actualizado!",
            "El usuario ha sido actualizado.",
            "success"
          );
        });
      } else {
        this.userService.createUser(result).subscribe(() => {
          this.loadUsers();
          Swal.fire("¡Creado!", "El usuario ha sido creado.", "success");
        });
      }
      modalRef.close();
    });
  }

  viewModal(user: User): void {
    const modalRef = this.modalService.open(FormViewModalUserComponent);
    modalRef.componentInstance.user = user;
  }

  reloadTable(): void {
    this.loadUsers();
  }

  onPageChange(page: number): void {
    this.page = page;
    this.loadUsers();
  }

  onLimitChange(limit: number): void {
    this.limit = limit;
    this.loadUsers();
  }

  getPropertyValue(user: User, key: string): any {
    return user[key as keyof User];
  }
}
