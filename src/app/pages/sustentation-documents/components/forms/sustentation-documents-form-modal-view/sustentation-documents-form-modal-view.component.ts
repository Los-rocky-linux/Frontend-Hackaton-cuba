import { Component, Input } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { Sustentation } from '../../../../../core/interfaces/sustentation.interface';

@Component({
  selector: "app-form-view-modal-sustentation",
  templateUrl: "./sustentation-documents-form-modal-view.component.html",
  styleUrls: ["./sustentation-documents-form-modal-view.component.scss"],
})
export class FormViewModalSustentationComponent {
  @Input() sustentation?: Sustentation;

  constructor(public activeModal: NgbActiveModal) {}
}
