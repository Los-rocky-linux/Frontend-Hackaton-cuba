import { Component, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ManagementTopicService } from "../../../../../core/services/global/management-topic.service";
import { EnrollmentService } from "../../../../../core/services/enrollment.service";
import { FilterCommunicationService } from "../../../../../core/services/filter-communication.service";
import { MANAGEMENT_TOPIC_TABLE_COLUMNS } from "../../../../../core/constants/global/management-topic.constant";
import { ManagementTopic } from "../../../../../core/interfaces/global/management-topic.interface";
import { Enrollment } from "../../../../../core/interfaces/enrollment.interface";
import { FormModalManagementTopicComponent } from "../../forms/form-modal-management-topic/form-modal-management-topic.component";
import { FormViewModalManagementTopicComponent } from "../../forms/form-view-modal-management-topic/form-view-modal-management-topic.component";
import Swal from "sweetalert2";

@Component({
  selector: "app-table-management-topic",
  templateUrl: "./table-management-topic.component.html",
  styleUrls: ["./table-management-topic.component.scss"],
})
export class TableManagementTopicComponent implements OnInit {
  public isLoading = true;
  public tableColumns = MANAGEMENT_TOPIC_TABLE_COLUMNS;
  public tableData: ManagementTopic[] = [];
  public filteredData: ManagementTopic[] = [];
  public enrollments: { [key: string]: Enrollment } = {};
  public collectionSize = 0;
  public page = 1;
  public limit = 10;

  constructor(
    private managementTopicService: ManagementTopicService,
    private enrollmentService: EnrollmentService,
    private filterService: FilterCommunicationService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.loadManagementTopics();
    this.filterService.currentFilter.subscribe((filter) => {
      this.applyFilter(filter);
    });
  }

  loadManagementTopics(): void {
    this.isLoading = true;
    this.managementTopicService
      .getAllManagementTopics(this.page, this.limit)
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

  deleteManagementTopic(id: string): void {
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
        this.managementTopicService.deleteManagementTopic(id).subscribe(() => {
          this.loadManagementTopics();
          Swal.fire("¡Borrado!", "El tema ha sido borrado.", "success");
        });
      }
    });
  }

  openModal(managementTopic?: ManagementTopic): void {
    const modalRef = this.modalService.open(FormModalManagementTopicComponent);
    modalRef.componentInstance.managementTopic = managementTopic;

    modalRef.componentInstance.save.subscribe((result: ManagementTopic) => {
      if (managementTopic) {
        this.managementTopicService
          .updateManagementTopic(managementTopic._id, result)
          .subscribe(() => {
            this.loadManagementTopics();
            Swal.fire(
              "¡Actualizado!",
              "El tema ha sido actualizado.",
              "success"
            );
          });
      } else {
        this.managementTopicService
          .createManagementTopic(result)
          .subscribe(() => {
            this.loadManagementTopics();
            Swal.fire("¡Creado!", "El tema ha sido creado.", "success");
          });
      }
      modalRef.close();
    });
  }

  viewModal(managementTopic: ManagementTopic): void {
    const modalRef = this.modalService.open(
      FormViewModalManagementTopicComponent
    );
    modalRef.componentInstance.managementTopic = managementTopic;
  }

  getPropertyValue(topic: ManagementTopic, key: string): any {
    if (key === "enrollment") {
      const enrollment = this.enrollments[topic.enrollment];
      return enrollment
        ? `${enrollment.createdBy.name} ${enrollment.createdBy.lastName}`
        : "N/A";
    }
    return (topic as any)[key];
  }

  applyFilter(filter: any): void {
    if (!filter) {
      this.filteredData = this.tableData;
      return;
    }

    this.filteredData = this.tableData.filter((topic) => {
      const assignedTopicMatch =
        !filter.assignedTopic ||
        topic.assignedTopic.includes(filter.assignedTopic);
      const enrollmentMatch =
        !filter.enrollment ||
        this.enrollments[topic.enrollment]?.createdBy.name.includes(
          filter.enrollment
        ) ||
        this.enrollments[topic.enrollment]?.createdBy.lastName.includes(
          filter.enrollment
        );
      const statusManagementTopicMatch =
        filter.statusManagementTopic === "" ||
        topic.statusManagementTopic ===
          (filter.statusManagementTopic === "true");

      return (
        assignedTopicMatch && enrollmentMatch && statusManagementTopicMatch
      );
    });
  }

  reloadTable(): void {
    this.loadManagementTopics();
  }

  onPageChange(page: number): void {
    this.page = page;
    this.loadManagementTopics();
  }

  onLimitChange(limit: number): void {
    this.limit = limit;
    this.loadManagementTopics();
  }
}
