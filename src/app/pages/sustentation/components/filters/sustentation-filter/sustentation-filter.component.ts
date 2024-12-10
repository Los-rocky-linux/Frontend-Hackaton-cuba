import { Component } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { FilterCommunicationService } from "../../../../../core/services/filter-communication.service";

@Component({
  selector: "app-sustentation-filter",
  templateUrl: "./sustentation-filter.component.html",
  styleUrls: ["./sustentation-filter.component.scss"],
})
export class SustentationFilterComponent {
  form: FormGroup;
  statuses = [
    { id: "Pending", name: "Pendiente" },
    { id: "Approved", name: "Aprobado" },
    { id: "Rejected", name: "Rechazado" },
  ];
  isExpanded = false;

  constructor(
    private fb: FormBuilder,
    private filterService: FilterCommunicationService
  ) {
    this.form = this.fb.group({
      date: [""],
      requirements: [""],
      status: [""],
      remarks: [""],
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
