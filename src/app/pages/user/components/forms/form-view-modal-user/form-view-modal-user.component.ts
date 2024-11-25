import { Component, Input } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { User } from "../../../../../core/interfaces/global/user.interface";

@Component({
  selector: "app-form-view-modal-user",
  templateUrl: "./form-view-modal-user.component.html",
  styleUrls: ["./form-view-modal-user.component.scss"],
})
export class FormViewModalUserComponent {
  @Input() user?: User;

  constructor(public activeModal: NgbActiveModal) {}
}
