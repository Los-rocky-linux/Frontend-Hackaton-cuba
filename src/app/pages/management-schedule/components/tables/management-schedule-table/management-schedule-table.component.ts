import { Component, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ScheduleService } from "../../../../../core/services/global/management-schedule.service";
import { EnrollmentService } from "../../../../../core/services/enrollment.service";
import { UserService } from "../../../../../core/services/global/user.service";
import { FilterCommunicationService } from "../../../../../core/services/filter-communication.service";
import { Schedule } from "../../../../../core/interfaces/global/management-schedule.interface";
import { MANAGEMENT_SCHEDULE_TABLE_COLUMNS } from "../../../../../core/constants/global/management-schedule.constant";
import Swal from "sweetalert2";
import { ManagementScheduleFormModalComponent } from "../../forms/management-schedule-form-modal/management-schedule-form-modal.component";
@Component({
  selector: "app-management-schedule-table",
  templateUrl: "./management-schedule-table.component.html",
  styleUrls: ["./management-schedule-table.component.scss"],
})
export class ManagementScheduleTableComponent implements OnInit {
  public isLoading = true;
  public tableColumns = MANAGEMENT_SCHEDULE_TABLE_COLUMNS;
  public tableData: Schedule[] = [];
  public filteredData: Schedule[] = [];
  public enrollments: { [key: string]: any } = {};
  public courts: { [key: string]: string } = {};
  public collectionSize = 0;
  public page = 1;
  public limit = 10;

  constructor(
    private scheduleService: ScheduleService,
    private enrollmentService: EnrollmentService,
    private filterService: FilterCommunicationService,
    private userService: UserService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.loadSchedules();
    this.loadEnrollments();
    this.loadCourts();
    this.filterService.currentFilter.subscribe((filter) => {
      this.applyFilter(filter);
    });
  }

  loadSchedules(): void {
    this.isLoading = true;
    this.scheduleService
      .getAllSchedules(this.page, this.limit)
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

  deleteSchedule(id: string): void {
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
        this.scheduleService.deleteSchedule(id).subscribe(() => {
          this.loadSchedules();
          Swal.fire("¡Borrado!", "El horario ha sido borrado.", "success");
        });
      }
    });
  }

  getPropertyValue(schedule: Schedule, key: string): any {
    if (key === "enrollment") {
      const enrollment = this.enrollments[schedule.enrollment];
      return enrollment
        ? `${enrollment.createdBy.name} ${enrollment.createdBy.lastName} - ${enrollment.modality.name}`
        : "N/A";
    }
    if (key === "statusSchedule") {
      return schedule.statusSchedule ? "Activo" : "Inactivo";
    }
    if (key === "assignedCourt") {
      return schedule.assignedCourt
        .map((courtId) => this.courts[courtId])
        .join(", ");
    }
    return (schedule as any)[key];
  }

  applyFilter(filter: any): void {
    if (!filter) {
      this.filteredData = this.tableData;
      return;
    }

    this.filteredData = this.tableData.filter((schedule) => {
      const enrollmentMatch =
        !filter.enrollment ||
        this.enrollments[schedule.enrollment]?.createdBy.name.includes(
          filter.enrollment
        ) ||
        this.enrollments[schedule.enrollment]?.createdBy.lastName.includes(
          filter.enrollment
        );
      const statusScheduleMatch =
        filter.statusSchedule === "" ||
        schedule.statusSchedule === (filter.statusSchedule === "true");

      return enrollmentMatch && statusScheduleMatch;
    });
  }

  reloadTable(): void {
    this.loadSchedules();
  }

  onPageChange(page: number): void {
    this.page = page;
    this.loadSchedules();
  }

  onLimitChange(limit: number): void {
    this.limit = limit;
    this.loadSchedules();
  }

  openModal(schedule?: Schedule): void {
    const modalRef = this.modalService.open(
      ManagementScheduleFormModalComponent
    );
    modalRef.componentInstance.schedule = schedule;
    modalRef.componentInstance.save.subscribe((result: Schedule) => {
      if (schedule) {
        this.scheduleService
          .updateSchedule(schedule._id, result)
          .subscribe(() => {
            this.loadSchedules();
          });
      } else {
        this.scheduleService.createSchedule(result).subscribe(() => {
          this.loadSchedules();
        });
      }
    });
  }

  viewModal(schedule: Schedule): void {
    const modalRef = this.modalService.open(
      ManagementScheduleFormModalComponent
    );
    modalRef.componentInstance.schedule = schedule;
  }
}
