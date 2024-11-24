import { Component, Input } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { ManagementTopic } from "../../../../../core/interfaces/global/management-topic.interface";

@Component({
  selector: "app-form-view-modal-management-topic",
  templateUrl: "./form-view-modal-management-topic.component.html",
  styleUrl: "./form-view-modal-management-topic.component.scss",
})
export class FormViewModalManagementTopicComponent {
  @Input() managementTopic?: ManagementTopic;

  constructor(public activeModal: NgbActiveModal) {}
}
