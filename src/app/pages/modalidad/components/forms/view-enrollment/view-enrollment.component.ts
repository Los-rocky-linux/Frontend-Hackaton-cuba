import { Component, OnInit } from '@angular/core';
import { Enrollment } from '../../../../../core/interfaces/enrollment.interface';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BootstrapModalService } from '../../../../../core/services/boostrap-modal.service';

@Component({
  selector: 'app-view-enrollment',
  templateUrl: './view-enrollment.component.html',
  styleUrls: ['./view-enrollment.component.scss'],
})
export class ViewEnrollmentComponent implements OnInit {
  public enrollment!: Enrollment;

  constructor(
    public activeModal: NgbActiveModal,
    private _bsModalService: BootstrapModalService
  ) {}

  ngOnInit(): void {
    this._bsModalService.getDataIssued().subscribe((data: any) => {
      this.enrollment = data.enrollment;
    });
  }

  formatTutors(tutors: Array<{ _id: string; name: string }>): string {
    return tutors.map((tutor) => tutor.name).join(', ') || 'No asignados';
  }

  closeModal(): void {
    this.activeModal.dismiss();
  }
}
