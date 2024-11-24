import { Component } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { FilterCommunicationService } from "../../../../../core/services/filter-communication.service";
import { MANAGEMENT_TOPIC_NG_SELECT_STATUS } from "../../../../../core/constants/global/management-topic.constant";

@Component({
  selector: "app-filter-management-topic",
  templateUrl: "./filter-management-topic.component.html",
  styleUrls: ["./filter-management-topic.component.scss"],
})
export class FilterManagementTopicComponent {
  form: FormGroup;
  statuses = MANAGEMENT_TOPIC_NG_SELECT_STATUS;
  isExpanded = false;

  constructor(
    private fb: FormBuilder,
    private filterService: FilterCommunicationService
  ) {
    this.form = this.fb.group({
      assignedTopic: [""],
      enrollment: [""],
      statusManagementTopic: [""],
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
