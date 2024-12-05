import { Component } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { FilterCommunicationService } from "../../../../../core/services/filter-communication.service";

@Component({
  selector: "app-management-court-filter",
  templateUrl: "./management-court-filter.component.html",
  styleUrls: ["./management-court-filter.component.scss"],
})
export class ManagementCourtFilterComponent {
  form: FormGroup;
  isExpanded = false;

  constructor(
    private fb: FormBuilder,
    private filterService: FilterCommunicationService
  ) {
    this.form = this.fb.group({
      assignedCourt: [""],
      enrollment: [""],
      statusManagementCourt: [""],
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
