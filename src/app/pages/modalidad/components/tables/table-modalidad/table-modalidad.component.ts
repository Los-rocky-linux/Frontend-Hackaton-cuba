import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { EnrollmentService } from '../../../../../core/services/enrollment.service';
import {
  Enrollment,
  EnrollmentDisplay,
} from '../../../../../core/interfaces/enrollment.interface';
import { BootstrapModalConfig } from '../../../../../core/interfaces/IBootstrapModal.interface';
import { BootstrapModalService } from '../../../../../core/services/boostrap-modal.service';
import { FormModalidadComponent } from '../../forms/form-modalidad/form-modalidad.component';
import { ViewEnrollmentComponent } from '../../forms/view-enrollment/view-enrollment.component';
import Swal from 'sweetalert2'; // Importar SweetAlert2

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
          preferredTutorsNames: this.formatTutors(
            enrollment.preferredTutors || []
          ),
          developmentTypeName: enrollment.developmentMechanism?.name || 'N/A',
          modalityName: enrollment.modality?.name || 'N/A',
          createdByName: enrollment.createdBy
            ? `${enrollment.createdBy.name} ${enrollment.createdBy.lastName}`
            : 'N/A',
          partnerName: enrollment.partner
            ? `${enrollment.partner.name} ${enrollment.partner.lastName}`
            : 'Sin compañero',
          isGroupCreated: enrollment.isGroupCreated, // Incluir este campo
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
    const modalCloseSubscription = this._bsModalService
      .getModalClosed()
      .subscribe((closed) => {
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

  openViewEnrollmentModal(enrollment: Enrollment): void {
    const modalConfig: BootstrapModalConfig = {
      title: 'Ver Información de la Inscripción',
      options: { size: 'lg', centered: true },
      component: ViewEnrollmentComponent,
      data: { enrollment: enrollment },
    };

    this._bsModalService.openModal(modalConfig);
  }

  getDevelopmentMechanismClass(
    developmentMechanismName: string | undefined
  ): string {
    if (!developmentMechanismName) {
      return '';
    }

    const mechanismClasses: Record<string, string> = {
      Grupal: 'development-grupal',
      Individual: 'development-individual',
    };

    return mechanismClasses[developmentMechanismName] || 'development-default';
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

  // Método para Obtener Texto de Estado del Grupo
  getGroupStatusText(enrollment: EnrollmentDisplay): string {
    if (enrollment.developmentTypeName === 'Individual') {
      return 'Individual';
    } else if (enrollment.isGroupCreated) {
      return 'Grupo Formado';
    } else {
      return 'Pendiente';
    }
  }

  // Método para Obtener Clase CSS del Estado del Grupo
  getGroupStatusClass(enrollment: EnrollmentDisplay): string {
    if (enrollment.developmentTypeName === 'Individual') {
      return 'group-individual'; // Clase CSS para individual
    } else if (enrollment.isGroupCreated) {
      return 'group-formed'; // Clase CSS para grupo formado
    } else {
      return 'group-pending'; // Clase CSS para pendiente
    }
  }

  // Método para Confirmar Eliminación con SweetAlert
  confirmDeleteEnrollment(enrollment: EnrollmentDisplay): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará la inscripción. ¿Deseas continuar?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteEnrollment(enrollment._id);
      }
    });
  }

  // Método para Eliminar la Inscripción
  deleteEnrollment(enrollmentId: string): void {
    this.enrollmentService.deleteEnrollment(enrollmentId).subscribe({
      next: () => {
        Swal.fire(
          'Eliminado',
          'La inscripción ha sido eliminada correctamente.',
          'success'
        );
        this.reloadTable();
      },
      error: (error) => {
        console.error('[TableModalidadComponent] Error while deleting enrollment:', error);
        Swal.fire(
          'Error',
          error.error.message || 'Ocurrió un error al eliminar la inscripción.',
          'error'
        );
      },
    });
  }
}
