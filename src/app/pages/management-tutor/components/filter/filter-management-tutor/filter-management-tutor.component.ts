import { Component } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { FilterCommunicationService } from "../../../../../core/services/filter-communication.service";
import { MANAGEMENT_TUTOR_NG_SELECT_STATUS } from "../../../../../core/constants/global/management-tutor.constant";

@Component({
  selector: "app-filter-management-tutor",
  templateUrl: "./filter-management-tutor.component.html",
  styleUrls: ["./filter-management-tutor.component.scss"],
})
export class FilterManagementTutorComponent {
  form: FormGroup;
  statuses = MANAGEMENT_TUTOR_NG_SELECT_STATUS;
  isExpanded = false;

  constructor(
    private fb: FormBuilder,
    private filterService: FilterCommunicationService
  ) {
    this.form = this.fb.group({
      assignedTutor: [""],
      enrollment: [""],
      assignedTopic: [""],
      statusManagementTutor: [""],
    });
  }

  onSubmit() {
    this.filterService.changeFilter(this.form.value);
  }

  onReset() {
    this.form.reset();
    this.filterService.resetFilter();
  }

  toggleExpand() {
    this.isExpanded = !this.isExpanded;
  }
}

