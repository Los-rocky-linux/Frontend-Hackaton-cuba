import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { EnrollmentService } from '../../../../../core/services/enrollment.service';
import { Enrollment, EnrollmentDisplay } from '../../../../../core/interfaces/enrollment.interface';
import { BootstrapModalConfig } from '../../../../../core/interfaces/IBootstrapModal.interface';
import { BootstrapModalService } from '../../../../../core/services/boostrap-modal.service';
import { FormModalidadComponent } from '../../forms/form-modalidad/form-modalidad.component';

@Component({
  selector: 'app-table-modalidad',
  templateUrl: './table-modalidad.component.html',
  styleUrls: ['./table-modalidad.component.scss'],
})
export class TableModalidadComponent implements OnInit, OnDestroy {
  public isLoading = true;
  public enrollments: EnrollmentDisplay[] = [];
  public collectionSize = 0;
  public page = 1;
  public limit = 10;
  private subscriptions: Subscription[] = [];

  constructor(
    private enrollmentService: EnrollmentService,
    private _bsModalService: BootstrapModalService
  ) {}

  ngOnInit(): void {
    this.loadEnrollments();
    this.listenToModalClose();
  }

  loadEnrollments(): void {
    this.isLoading = true;
    this.enrollmentService.getAllEnrollments(this.page, this.limit).subscribe({
      next: (response) => {
        this.enrollments = response.result.map((enrollment) => ({
          ...enrollment,
          preferredTutorsNames: this.formatTutors(enrollment.preferredTutors || []),
          developmentTypeName: enrollment.developmentMechanism?.name || 'N/A',
          modalityName: enrollment.modality?.name || 'N/A',
          createdByName: enrollment.createdBy ? `${enrollment.createdBy.name} ${enrollment.createdBy.lastName}` : 'N/A',
          partnerName: enrollment.partner ? `${enrollment.partner.name} ${enrollment.partner.lastName}` : 'N/A',
        }));
        this.collectionSize = response.totalCount;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  listenToModalClose(): void {
    const modalCloseSubscription = this._bsModalService.getModalClosed().subscribe((closed) => {
      if (closed) {
        this.reloadTable();
      }
    });
    this.subscriptions.push(modalCloseSubscription);
  }

  formatTutors(tutors: { name: string }[]): string {
    return tutors.map((tutor) => tutor.name).join(', ') || 'N/A';
  }

  openCreateEnrollmentFormModal(): void {
    const modalConfig: BootstrapModalConfig = {
      title: 'Crear Nueva Inscripción',
      options: { size: 'xl', centered: true },
      component: FormModalidadComponent,
      data: {
        enrollmentData: null,
        isEdit: false,
      },
    };
    this._bsModalService.openModal(modalConfig);
  }

  openEditEnrollmentFormModal(enrollment: Enrollment): void {
    console.log('Abrir modal de edición con datos de inscripción:', enrollment);
    const modalConfig: BootstrapModalConfig = {
      title: 'Editar Inscripción',
      options: { size: 'xl', centered: true },
      component: FormModalidadComponent,
      data: {
        enrollmentData: enrollment,
        isEdit: true,
      },
    };
    this._bsModalService.openModal(modalConfig);
  }
  

  reloadTable(): void {
    this.loadEnrollments();
  }

  onPageChange(page: number): void {
    this.page = page;
    this.loadEnrollments();
  }

  onLimitChange(limit: number): void {
    this.limit = limit;
    this.loadEnrollments();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  trackByEnrollmentId(index: number, enrollment: EnrollmentDisplay): string {
    return enrollment._id;
  }
}
