import { Component, Input, OnInit, Output, EventEmitter } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { Schedule } from "../../../../../core/interfaces/global/management-schedule.interface";
import { UserService } from "../../../../../core/services/global/user.service";
import { EnrollmentService } from "../../../../../core/services/enrollment.service";

@Component({
  selector: "app-management-schedule-form-modal",
  templateUrl: "./management-schedule-form-modal.component.html",
  styleUrls: ["./management-schedule-form-modal.component.scss"],
})
export class ManagementScheduleFormModalComponent implements OnInit {
  @Input() schedule?: Schedule;
  @Output() save = new EventEmitter<Schedule>();

  form: FormGroup;
  enrollments: any[] = [];
  courts: any[] = [];
  tutors: any[] = [];

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private enrollmentService: EnrollmentService,
    public activeModal: NgbActiveModal
  ) {
    this.form = this.fb.group({
      assignedDate: ["", Validators.required],
      assignedCourt: [[], Validators.required],
      assignedTutor: ["", Validators.required],
      enrollment: ["", Validators.required],
      statusSchedule: [true, Validators.required],
    });
  }

  ngOnInit() {
    this.loadEnrollments();
    this.loadCourts();
    this.loadTutors();
    if (this.schedule) {
      this.form.patchValue(this.schedule);
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

  loadTutors() {
    this.userService.getAllTutors().subscribe((response) => {
      this.tutors = response.result;
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.save.emit(this.form.value);
      this.activeModal.close();
    }
  }
}
