import { Injectable, OnDestroy } from "@angular/core";
import { NgbModal, NgbModalOptions } from "@ng-bootstrap/ng-bootstrap";

import { BehaviorSubject, Observable, Subject } from "rxjs";
import { BootstrapModalConfig } from "../interfaces/IBootstrapModal.interface";
import { BootstrapModalComponent } from "../../shared/components/modals/bootstrap-modal/bootstrap-modal/bootstrap-modal.component";

@Injectable({
  providedIn: "root",
})
export class BootstrapModalService implements OnDestroy {
  private dataIssuedSubject: BehaviorSubject<any>;
  private modalClosedSubject: Subject<boolean>;
  private defaultOptions!: NgbModalOptions;
  private modalClosedListenerSubject: Subject<void>;
  constructor(private modalService: NgbModal) {
    this.dataIssuedSubject = new BehaviorSubject<any>({});
    this.modalClosedSubject = new Subject<boolean>();
    this.modalClosedListenerSubject = new Subject<void>();
    this.defaultOptions = {
      backdrop: "static",
      centered: true,
      keyboard: false,
      size: "lg",
    };
  }

  private resetDefaultOptions(): void {
    this.defaultOptions = {
      backdrop: "static",
      centered: true,
      keyboard: false,
      size: "lg",
    };
  }

  openModal(BootstrapModalConfig: BootstrapModalConfig): void {
    this.resetDefaultOptions();

    if (BootstrapModalConfig.options) {
      this.defaultOptions = {
        ...this.defaultOptions,
        ...BootstrapModalConfig.options,
      };
    }

    const modalRef = this.modalService.open(
      BootstrapModalComponent,
      this.defaultOptions,
    );

    modalRef.componentInstance.title = BootstrapModalConfig.title;
    modalRef.componentInstance.component = BootstrapModalConfig.component;
    modalRef.componentInstance.options = BootstrapModalConfig.options;

    if (BootstrapModalConfig.data !== undefined) {
      this.updateDataIssued(BootstrapModalConfig.data);
    } else {
      this.updateDataIssued({});
    }
  }

  updateDataIssued(dataIssued: any): void {
    this.dataIssuedSubject.next(dataIssued);
  }

  getDataIssued(): Observable<any> {
    return this.dataIssuedSubject.asObservable();
  }

  updateModalClosed(modalClosed: boolean): void {
    this.modalClosedSubject.next(modalClosed);
  }

  getModalClosed(): Observable<boolean> {
    return this.modalClosedSubject.asObservable();
  }

  getModalClosedListener(): Observable<void> {
    return this.modalClosedListenerSubject.asObservable();
  }

  updateModalClosedListener() {
    this.modalClosedListenerSubject.next();
  }

  ngOnDestroy(): void {
    this.dataIssuedSubject.complete();
    this.modalClosedSubject.complete();
  }
}
