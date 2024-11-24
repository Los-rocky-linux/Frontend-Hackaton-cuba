import { Component, Input, Output, EventEmitter, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { ManagementTopic } from "../../../../../core/interfaces/global/management-topic.interface";
import { MANAGEMENT_TOPIC_NG_SELECT_STATUS } from "../../../../../core/constants/global/management-topic.constant";
import { EnrollmentService } from "../../../../../core/services/enrollment.service";
import { Enrollment } from "../../../../../core/interfaces/enrollment.interface";

@Component({
  selector: "app-form-modal-management-topic",
  templateUrl: "./form-modal-management-topic.component.html",
  styleUrls: ["./form-modal-management-topic.component.scss"],
})
export class FormModalManagementTopicComponent implements OnInit {
  @Input() managementTopic?: ManagementTopic;
  @Output() save = new EventEmitter<ManagementTopic>();

  form: FormGroup;
  statuses = MANAGEMENT_TOPIC_NG_SELECT_STATUS;
  enrollments: Enrollment[] = [];
  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    private enrollmentService: EnrollmentService,
    public activeModal: NgbActiveModal
  ) {
    this.form = this.fb.group({
      assignedTopic: ["", Validators.required],
      enrollment: ["", Validators.required],
      statusManagementTopic: [true, Validators.required],
      problemDescription: [{ value: "", disabled: true }],
    });
  }

  ngOnInit() {
    this.loadEnrollments();
    if (this.managementTopic) {
      this.isEditMode = true;
      this.form.patchValue(this.managementTopic);
      this.form.get("assignedTopic")?.enable();
      this.form.get("statusManagementTopic")?.enable();
    }
    this.onEnrollmentChange();
  }

  loadEnrollments() {
    this.enrollmentService.getAllEnrollments().subscribe((response) => {
      this.enrollments = response.result;
    });
  }

  onEnrollmentChange() {
    this.form.get("enrollment")?.valueChanges.subscribe((enrollmentId) => {
      const selectedEnrollment = this.enrollments.find(
        (enrollment) => enrollment._id === enrollmentId
      );
      if (selectedEnrollment) {
        this.form.patchValue({
          assignedTopic: selectedEnrollment.topicTitle || "",
          problemDescription: selectedEnrollment.problemDescription || "",
        });
      }
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.save.emit(this.form.getRawValue());
      this.activeModal.close();
    }
  }
}
