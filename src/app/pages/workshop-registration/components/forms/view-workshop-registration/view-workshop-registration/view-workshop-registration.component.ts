import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BootstrapModalService } from '../../../../../../core/services/boostrap-modal.service';

@Component({
  selector: 'app-view-workshop-registration',
  templateUrl: './view-workshop-registration.component.html',
  styleUrls: ['./view-workshop-registration.component.scss'],
})
export class ViewWorkshopRegistrationComponent implements OnInit {
  public workshopRegistration: any;

  constructor(
    public activeModal: NgbActiveModal,
    private _bsModalService: BootstrapModalService
  ) {}

  ngOnInit(): void {
    this._bsModalService.getDataIssued().subscribe((data: any) => {
      this.workshopRegistration = data.workshopRegistration;
      console.log('Datos recibidos en el modal de ver información:', this.workshopRegistration);

    });
  }

  closeModal(): void {
    this.activeModal.dismiss();
  }
}
