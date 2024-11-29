import { Component, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ManagementTutorService } from "../../../../../core/services/global/management-tutor.service";
import { EnrollmentService } from "../../../../../core/services/enrollment.service";
import { FilterCommunicationService } from "../../../../../core/services/filter-communication.service";
import { MANAGEMENT_TUTOR_TABLE_COLUMNS } from "../../../../../core/constants/global/management-tutor.constant";
import { ManagementTutor } from "../../../../../core/interfaces/global/management-tutor.interface";
import { Enrollment } from "../../../../../core/interfaces/enrollment.interface";
import { FormModalManagementTutorComponent } from "../../forms/form-modal-management-tutor/form-modal-management-tutor.component";
import { FormViewModalManagementTutorComponent } from "../../forms/form-view-modal-management-tutor/form-view-modal-management-tutor.component";
import Swal from "sweetalert2";
import { UserService } from "../../../../../core/services/global/user.service"; // Importa el servicio de usuarios
import { User } from "../../../../../core/interfaces/global/user.interface";
import { ManagementTopicService } from "../../../../../core/services/global/management-topic.service"; // Importa el servicio de temas
import { ManagementTopic } from "../../../../../core/interfaces/global/management-topic.interface";

@Component({
  selector: "app-table-management-tutor",
  templateUrl: "./table-management-tutor.component.html",
  styleUrls: ["./table-management-tutor.component.scss"],
})
export class TableManagementTutorComponent implements OnInit {
  public isLoading = true;
  public tableColumns = MANAGEMENT_TUTOR_TABLE_COLUMNS;
  public tableData: ManagementTutor[] = [];
  public filteredData: ManagementTutor[] = [];
  public enrollments: { [key: string]: Enrollment } = {};
  public tutors: { [key: string]: User } = {}; // Añade esta línea
  public topics: { [key: string]: ManagementTopic } = {}; // Añade esta línea
  public collectionSize = 0;
  public page = 1;
  public limit = 10;

  constructor(
    private managementTutorService: ManagementTutorService,
    private enrollmentService: EnrollmentService,
    private userService: UserService, // Añade el servicio de usuarios
    private managementTopicService: ManagementTopicService, // Añade el servicio de temas
    private filterService: FilterCommunicationService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.loadManagementTutors();
    this.loadTutors();
    this.loadTopics();
    this.filterService.currentFilter.subscribe((filter) => {
      this.applyFilter(filter);
    });
  }

  loadManagementTutors(): void {
    this.isLoading = true;
    this.managementTutorService
      .getAllManagementTutors(this.page, this.limit)
      .subscribe((response) => {
        this.tableData = response.result;
        this.filteredData = response.result;
        this.collectionSize = response.totalCount;
        this.loadEnrollments();
      });
  }

  loadEnrollments(): void {
    this.enrollmentService.getAllEnrollments().subscribe((response) => {
      response.result.forEach((enrollment) => {
        this.enrollments[enrollment._id] = enrollment;
      });
      this.isLoading = false;
    });
  }

  loadTutors(): void {
    // Añade esta función
    this.userService.getAllTutors().subscribe((response) => {
      response.result.forEach((tutor) => {
        this.tutors[tutor.id] = tutor;
      });
    });
  }

  loadTopics(): void {
    // Añade esta función
    this.managementTopicService
      .getAllManagementTopics()
      .subscribe((response) => {
        response.result.forEach((topic) => {
          this.topics[topic._id] = topic;
        });
      });
  }

  deleteManagementTutor(id: string): void {
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
        this.managementTutorService.deleteManagementTutor(id).subscribe(() => {
          this.loadManagementTutors();
          Swal.fire("¡Borrado!", "El tutor ha sido borrado.", "success");
        });
      }
    });
  }

  openModal(managementTutor?: ManagementTutor): void {
    const modalRef = this.modalService.open(FormModalManagementTutorComponent);
    modalRef.componentInstance.managementTutor = managementTutor;

    modalRef.componentInstance.save.subscribe((result: ManagementTutor) => {
      if (managementTutor) {
        this.managementTutorService
          .updateManagementTutor(managementTutor._id, result)
          .subscribe(() => {
            this.loadManagementTutors();
            Swal.fire(
              "¡Actualizado!",
              "El tutor ha sido actualizado.",
              "success"
            );
          });
      } else {
        this.managementTutorService
          .createManagementTutor(result)
          .subscribe(() => {
            this.loadManagementTutors();
            Swal.fire("¡Creado!", "El tutor ha sido creado.", "success");
          });
      }
      modalRef.close();
    });
  }

  viewModal(managementTutor: ManagementTutor): void {
    const modalRef = this.modalService.open(
      FormViewModalManagementTutorComponent
    );
    modalRef.componentInstance.managementTutor = managementTutor;
  }

  // getPropertyValue(tutor: ManagementTutor, key: string): any {
  //   if (key === "enrollment") {
  //     const enrollment = this.enrollments[tutor.enrollment];
  //     return enrollment
  //       ? `${enrollment.createdBy.name} ${enrollment.createdBy.lastName} - ${enrollment.modality.name}`
  //       : "N/A";
  //   }
  //   if (key === "assignedTutor") {
  //     const assignedTutor = this.tutors[tutor.assignedTutor];
  //     return assignedTutor
  //       ? `${assignedTutor.name} ${assignedTutor.lastName}`
  //       : "N/A";
  //   }
  //   if (key === "statusManagementTutor") {
  //     return tutor.statusManagementTutor ? "Activo" : "Inactivo";
  //   }
  //   return (tutor as any)[key];
  // }

  getPropertyValue(tutor: ManagementTutor, key: string): any {
    if (key === "enrollment") {
      const enrollment = this.enrollments[tutor.enrollment];
      return enrollment
        ? `${enrollment.createdBy.name} ${enrollment.createdBy.lastName} - ${enrollment.modality.name}`
        : "N/A";
    }
    if (key === "assignedTutor") {
      const assignedTutor = this.tutors[tutor.assignedTutor];
      return assignedTutor
        ? `${assignedTutor.name} ${assignedTutor.lastName}`
        : "N/A";
    }
    if (key === "assignedTopic") {
      const topic = this.topics[tutor.assignedTopic];
      return topic ? topic.assignedTopic : "N/A";
    }
    if (key === "statusManagementTutor") {
      return tutor.statusManagementTutor ? "Activo" : "Inactivo";
    }
    return (tutor as any)[key];
  }

  applyFilter(filter: any): void {
    if (!filter) {
      this.filteredData = this.tableData;
      return;
    }

    this.filteredData = this.tableData.filter((tutor) => {
      const assignedTutorMatch =
        !filter.assignedTutor ||
        this.tutors[tutor.assignedTutor]?.name.includes(filter.assignedTutor) ||
        this.tutors[tutor.assignedTutor]?.lastName.includes(
          filter.assignedTutor
        );
      const enrollmentMatch =
        !filter.enrollment ||
        this.enrollments[tutor.enrollment]?.createdBy.name.includes(
          filter.enrollment
        ) ||
        this.enrollments[tutor.enrollment]?.createdBy.lastName.includes(
          filter.enrollment
        );
      const assignedTopicMatch =
        !filter.assignedTopic ||
        this.topics[tutor.assignedTopic]?.assignedTopic.includes(
          filter.assignedTopic
        );
      const statusManagementTutorMatch =
        filter.statusManagementTutor === "" ||
        tutor.statusManagementTutor ===
          (filter.statusManagementTutor === "true");

      return (
        assignedTutorMatch &&
        enrollmentMatch &&
        assignedTopicMatch &&
        statusManagementTutorMatch
      );
    });
  }

  reloadTable(): void {
    this.loadManagementTutors();
  }

  onPageChange(page: number): void {
    this.page = page;
    this.loadManagementTutors();
  }

  onLimitChange(limit: number): void {
    this.limit = limit;
    this.loadManagementTutors();
  }
}
