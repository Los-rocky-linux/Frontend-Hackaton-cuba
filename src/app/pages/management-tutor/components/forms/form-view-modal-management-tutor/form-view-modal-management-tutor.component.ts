import { Component, Input } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { ManagementTutor } from "../../../../../core/interfaces/global/management-tutor.interface";

@Component({
  selector: "app-form-view-modal-management-tutor",
  templateUrl: "./form-view-modal-management-tutor.component.html",
  styleUrls: ["./form-view-modal-management-tutor.component.scss"],
})
export class FormViewModalManagementTutorComponent {
  @Input() managementTutor?: ManagementTutor;

  constructor(public activeModal: NgbActiveModal) {}
}
