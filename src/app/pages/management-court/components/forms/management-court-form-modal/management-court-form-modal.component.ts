import { Component, Input, OnInit, Output, EventEmitter } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { ManagementCourt } from "../../../../../core/interfaces/global/management-court.interface";
import { UserService } from "../../../../../core/services/global/user.service";
import { EnrollmentService } from "../../../../../core/services/enrollment.service";

@Component({
  selector: "app-management-court-form-modal",
  templateUrl: "./management-court-form-modal.component.html",
  styleUrls: ["./management-court-form-modal.component.scss"],
})
export class ManagementCourtFormModalComponent implements OnInit {
  @Input() managementCourt?: ManagementCourt;
  @Output() save = new EventEmitter<ManagementCourt>();

  form: FormGroup;
  enrollments: any[] = [];
  courts: any[] = [];

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private enrollmentService: EnrollmentService,
    public activeModal: NgbActiveModal
  ) {
    this.form = this.fb.group({
      assignedCourt: [[], Validators.required],
      enrollment: ["", Validators.required],
      statusManagementCourt: [true, Validators.required],
    });
  }

  ngOnInit() {
    this.loadEnrollments();
    this.loadCourts();
    if (this.managementCourt) {
      this.form.patchValue(this.managementCourt);
    }
  }

  loadEnrollments() {
    this.enrollmentService.getAllEnrollments().subscribe((response) => {
      this.enrollments = response.result;
    });
  }

  loadCourts() {
    this.userService.getAllCourts().subscribe((response) => {
      this.courts = response.result;
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.save.emit(this.form.value);
      this.activeModal.close();
    }
  }
}
