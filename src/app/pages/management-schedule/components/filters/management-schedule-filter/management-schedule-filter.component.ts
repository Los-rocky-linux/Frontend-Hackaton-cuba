import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { FilterCommunicationService } from "../../../../../core/services/filter-communication.service";

@Component({
  selector: "app-management-schedule-filter",
  templateUrl: "./management-schedule-filter.component.html",
  styleUrls: ["./management-schedule-filter.component.scss"],
})
export class ManagementScheduleFilterComponent implements OnInit {
  form: FormGroup;
  isExpanded = false;

  constructor(
    private fb: FormBuilder,
    private filterService: FilterCommunicationService
  ) {
    this.form = this.fb.group({
      assignedCourt: [""],
      assignedTutor: [""],
      enrollment: [""],
      statusSchedule: [""],
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    this.filterService.changeFilter(this.form.value);
  }

  onReset(): void {
    this.form.reset();
    this.filterService.resetFilter();
  }

  toggleExpand(): void {
    this.isExpanded = !this.isExpanded;
  }
}
