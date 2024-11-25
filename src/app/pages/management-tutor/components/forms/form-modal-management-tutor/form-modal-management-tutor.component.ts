import { Component, Input, Output, EventEmitter, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { ManagementTutor } from "../../../../../core/interfaces/global/management-tutor.interface";
import { MANAGEMENT_TUTOR_NG_SELECT_STATUS } from "../../../../../core/constants/global/management-tutor.constant";
import { EnrollmentService } from "../../../../../core/services/enrollment.service";
import { Enrollment } from "../../../../../core/interfaces/enrollment.interface";
import { UserService } from "../../../../../core/services/global/user.service";
import { User } from "../../../../../core/interfaces/global/user.interface";
import { ManagementTopicService } from "../../../../../core/services/global/management-topic.service";
import { ManagementTopic } from "../../../../../core/interfaces/global/management-topic.interface";

@Component({
  selector: "app-form-modal-management-tutor",
  templateUrl: "./form-modal-management-tutor.component.html",
  styleUrls: ["./form-modal-management-tutor.component.scss"],
})
export class FormModalManagementTutorComponent implements OnInit {
  @Input() managementTutor?: ManagementTutor;
  @Output() save = new EventEmitter<ManagementTutor>();

  form: FormGroup;
  statuses = MANAGEMENT_TUTOR_NG_SELECT_STATUS;
  enrollments: Enrollment[] = [];
  tutors: User[] = [];
  academicPeriods: string[] = [];
  assignedTopic: string = "";
  isEditMode = false;
  assignedTopicName: string = ""; // Para mostrar el texto del tema asignado

  constructor(
    private fb: FormBuilder,
    private enrollmentService: EnrollmentService,
    private userService: UserService,
    private managementTopicService: ManagementTopicService,
    public activeModal: NgbActiveModal
  ) {
    this.form = this.fb.group({
      assignedTutor: ["", Validators.required],
      enrollment: ["", Validators.required],
      academicPeriod: ["", Validators.required],
      statusManagementTutor: [true, Validators.required],
      assignedTopic: [""],
    });
  }

  ngOnInit() {
    this.loadEnrollments();
    this.loadTutors();
    this.loadAcademicPeriods();
    if (this.managementTutor) {
      this.isEditMode = true;
      this.form.patchValue(this.managementTutor);

      // Deshabilitar el campo 'enrollment' si está en modo edición
      this.form.get("enrollment")?.disable();

      this.loadAssignedTopic(this.managementTutor.enrollment);
    }
    this.onEnrollmentChange();
  }

  loadEnrollments() {
    this.enrollmentService.getAllEnrollments().subscribe((response) => {
      this.enrollments = response.result;
    });
  }

  loadTutors() {
    this.userService.getAllTutors().subscribe((response) => {
      this.tutors = response.result;
    });
  }

  loadAcademicPeriods() {
    const currentYear = new Date().getFullYear();
    this.academicPeriods = [
      `${currentYear} - 1`,
      `${currentYear} - 2`,
      `${currentYear + 1} - 1`,
      `${currentYear + 1} - 2`,
    ];
  }

  // loadAssignedTopic(enrollmentId: string) {
  //   this.managementTopicService
  //     .getManagementTopicByEnrollment(enrollmentId)
  //     .subscribe({
  //       next: (managementTopic) => {
  //         this.assignedTopic = managementTopic._id; // Cambia a _id en lugar de assignedTopic
  //         this.form.get("assignedTopic")?.setValue(this.assignedTopic);
  //         console.log("ID del tema asignado:", managementTopic._id);
  //       },
  //       error: (error) => {
  //         console.error("Error al cargar el tema asignado:", error.message);
  //         this.assignedTopic = "";
  //         this.form.get("assignedTopic")?.setValue("");
  //       },
  //     });
  // }

  loadAssignedTopic(enrollmentId: string) {
    this.managementTopicService
      .getManagementTopicByEnrollment(enrollmentId)
      .subscribe({
        next: (managementTopic) => {
          this.assignedTopic = managementTopic._id; // Almacena el _id
          this.assignedTopicName = managementTopic.assignedTopic; // Almacena el texto
          this.form.get("assignedTopic")?.setValue(this.assignedTopic);
        },
        error: (error) => {
          console.error("Error al cargar el tema asignado:", error.message);
          this.assignedTopic = "";
          this.assignedTopicName = ""; // Limpia el texto en caso de error
          this.form.get("assignedTopic")?.setValue("");
        },
      });
  }

  onEnrollmentChange() {
    this.form.get("enrollment")?.valueChanges.subscribe((enrollmentId) => {
      this.loadAssignedTopic(enrollmentId);
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const formData = this.form.getRawValue();
      formData.assignedTopic = this.assignedTopic;
      this.save.emit(formData);
      this.activeModal.close();
    }
  }
}
