import { Component, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ManagementCourtService } from "../../../../../core/services/global/management-court.service";
import { EnrollmentService } from "../../../../../core/services/enrollment.service";
import { UserService } from "../../../../../core/services/global/user.service";
import { FilterCommunicationService } from "../../../../../core/services/filter-communication.service";
import { MANAGEMENT_COURT_TABLE_COLUMNS } from "../../../../../core/constants/global/management-court.constants";
import { ManagementCourt } from "../../../../../core/interfaces/global/management-court.interface";
import { Enrollment } from "../../../../../core/interfaces/enrollment.interface";
import Swal from "sweetalert2";
import { ManagementCourtFormModalComponent } from "../../forms/management-court-form-modal/management-court-form-modal.component";

@Component({
  selector: "app-management-court-table",
  templateUrl: "./management-court-table.component.html",
  styleUrls: ["./management-court-table.component.scss"],
})
export class ManagementCourtTableComponent implements OnInit {
  public isLoading = true;
  public tableColumns = MANAGEMENT_COURT_TABLE_COLUMNS;
  public tableData: ManagementCourt[] = [];
  public filteredData: ManagementCourt[] = [];
  public enrollments: { [key: string]: Enrollment } = {};
  public courts: { [key: string]: string } = {};
  public collectionSize = 0;
  public page = 1;
  public limit = 10;

  constructor(
    private managementCourtService: ManagementCourtService,
    private enrollmentService: EnrollmentService,
    private filterService: FilterCommunicationService,
    private userService: UserService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.loadManagementCourts();
    this.loadEnrollments();
    this.loadCourts();
    this.filterService.currentFilter.subscribe((filter) => {
      this.applyFilter(filter);
    });
  }

  loadManagementCourts(): void {
    this.isLoading = true;
    this.managementCourtService
      .getAllManagementCourt(this.page, this.limit)
      .subscribe((response) => {
        this.tableData = response.result;
        this.filteredData = response.result;
        this.collectionSize = response.totalCount;
        this.isLoading = false;
      });
  }

  loadEnrollments(): void {
    this.enrollmentService.getAllEnrollments().subscribe((response) => {
      response.result.forEach((enrollment) => {
        this.enrollments[enrollment._id] = enrollment;
      });
    });
  }

  loadCourts(): void {
    this.userService.getAllCourts().subscribe((response) => {
      response.result.forEach((court: any) => {
        this.courts[court._id] = `${court.name} ${court.lastName}`;
      });
    });
  }
  deleteManagementCourt(id: string): void {
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
        this.managementCourtService.deleteManagementCourt(id).subscribe(() => {
          this.loadManagementCourts();
          Swal.fire("¡Borrado!", "El tribunal ha sido borrado.", "success");
        });
      }
    });
  }

  getPropertyValue(court: ManagementCourt, key: string): any {
    if (key === "enrollment") {
      const enrollment = this.enrollments[court.enrollment];
      return enrollment
        ? `${enrollment.createdBy.name} ${enrollment.createdBy.lastName} - ${enrollment.modality.name}`
        : "N/A";
    }
    if (key === "statusManagementCourt") {
      return court.statusManagementCourt ? "Activo" : "Inactivo";
    }
    if (key === "assignedCourt") {
      return court.assignedCourt
        .map((courtId) => this.courts[courtId])
        .join(", ");
    }
    return (court as any)[key];
  }

  // applyFilter(filter: any): void {
  //   if (!filter) {
  //     this.filteredData = this.tableData;
  //     return;
  //   }

  //   this.filteredData = this.tableData.filter((court) => {
  //     const enrollmentMatch =
  //       !filter.enrollment ||
  //       this.enrollments[court.enrollment]?.createdBy.name.includes(
  //         filter.enrollment
  //       ) ||
  //       this.enrollments[court.enrollment]?.createdBy.lastName.includes(
  //         filter.enrollment
  //       );
  //     const statusManagementCourtMatch =
  //       filter.statusManagementCourt === "" ||
  //       court.statusManagementCourt ===
  //         (filter.statusManagementCourt === "true");

  //     return enrollmentMatch && statusManagementCourtMatch;
  //   });
  // }

  applyFilter(filter: any): void {
    if (!filter) {
      this.filteredData = this.tableData;
      return;
    }

    this.filteredData = this.tableData.filter((court) => {
      const enrollmentMatch =
        !filter.enrollment ||
        this.enrollments[court.enrollment]?.createdBy.name.includes(
          filter.enrollment
        ) ||
        this.enrollments[court.enrollment]?.createdBy.lastName.includes(
          filter.enrollment
        );
      const statusManagementCourtMatch =
        filter.statusManagementCourt === "" ||
        court.statusManagementCourt ===
          (filter.statusManagementCourt === "true");

      return enrollmentMatch && statusManagementCourtMatch;
    });
  }

  reloadTable(): void {
    this.loadManagementCourts();
  }

  onPageChange(page: number): void {
    this.page = page;
    this.loadManagementCourts();
  }

  onLimitChange(limit: number): void {
    this.limit = limit;
    this.loadManagementCourts();
  }

  openModal(court?: ManagementCourt): void {
    const modalRef = this.modalService.open(ManagementCourtFormModalComponent);
    modalRef.componentInstance.managementCourt = court;
    modalRef.componentInstance.save.subscribe((result: ManagementCourt) => {
      if (court) {
        this.managementCourtService
          .updateManagementCourt(court._id, result)
          .subscribe(() => {
            this.loadManagementCourts();
          });
      } else {
        this.managementCourtService
          .createManagementCourt(result)
          .subscribe(() => {
            this.loadManagementCourts();
          });
      }
    });
  }

  viewModal(court: ManagementCourt): void {
    const modalRef = this.modalService.open(ManagementCourtFormModalComponent);
    modalRef.componentInstance.managementCourt = court;
  }
}
