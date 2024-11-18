import { Component, Input, OnInit, Type } from "@angular/core";

import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { Subscription } from "rxjs";


import { IBootstrapModalCustomOptions } from "../../../../../core/interfaces/IBootstrapModal.interface";
import { BootstrapModalService } from "../../../../../core/services/boostrap-modal.service";
@Component({
  selector: "shared-bootstrap-modal",
  templateUrl: "./bootstrap-modal.component.html",
  styleUrls: ["./bootstrap-modal.component.scss"],
})
export class BootstrapModalComponent implements OnInit {
  @Input() title!: string;
  @Input() options: IBootstrapModalCustomOptions | undefined = undefined;
  @Input() component!: Type<any>;

  private _subscriptions: Subscription[] = [];

  constructor(
    public activeModal: NgbActiveModal,
    private bsModalService: BootstrapModalService,
  ) { }

  ngOnInit() {
    this.closeModalByService();
  }

  private closeModalByService() {
    this._subscriptions.push(
      this.bsModalService.getModalClosed().subscribe((response: boolean) => {
        if (response) {
          this.closeModal();
        }
      }),
    );
  }

  closeModal() {
    this.bsModalService.updateModalClosedListener();
    this.activeModal.close();
  }

  ngOnDestroy(): void {
    this._subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
