import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { WorkshopRegistrationService } from '../../../../../core/services/workshop-registration.service';
import { WorkshopRegistration } from '../../../../../core/interfaces/workshop-registration.interface';
import { BootstrapModalService } from '../../../../../core/services/boostrap-modal.service';
import { CreateEditWorkshopRegistrationComponent } from '../../forms/create-edit-workshop-registration/create-edit-workshop-registration.component';
import { ViewWorkshopRegistrationComponent } from '../../forms/view-workshop-registration/view-workshop-registration/view-workshop-registration.component';

@Component({
  selector: 'app-table-workshop-registration',
  templateUrl: './table-workshop-registration.component.html',
  styleUrls: ['./table-workshop-registration.component.scss'],
})
export class TableWorkshopRegistrationComponent implements OnInit, OnDestroy {
  public isLoading = true;
  public workshopRegistrations: WorkshopRegistration[] = [];
  public collectionSize = 0; // Total de registros
  public page = 1; // Página actual
  public limit = 10; // Registros por página
  private subscriptions: Subscription = new Subscription();

  constructor(
    private registrationService: WorkshopRegistrationService,
    private _bsModalService: BootstrapModalService
  ) {}

  ngOnInit(): void {
    this.loadWorkshopRegistrations();
    this.subscriptions.add(
      this._bsModalService.getModalClosedListener().subscribe(() => {
        this.reloadTable();
      })
    );
  }

  loadWorkshopRegistrations(): void {
    this.isLoading = true;
    this.subscriptions.add(
      this.registrationService.getAllRegistrations(this.page, this.limit).subscribe({
        next: (response) => {
          this.workshopRegistrations = response.result;
          this.collectionSize = response.totalCount; // Total de registros
          this.isLoading = false;
        },
        error: () => {
          this.isLoading = false;
        },
      })
    );
  }

  reloadTable(): void {
    this.loadWorkshopRegistrations();
  }

  onPageChange(page: number): void {
    this.page = page;
    this.loadWorkshopRegistrations();
  }

  onLimitChange(limit: number): void {
    this.limit = limit;
    this.loadWorkshopRegistrations();
  }

  openCreateModal(): void {
    this._bsModalService.openModal({
      title: 'Crear Nueva Inscripción',
      options: { size: 'lg', centered: true },
      component: CreateEditWorkshopRegistrationComponent,
      data: {
        registrationData: null,
        isEdit: false,
      },
    });
  }

  openEditModal(registration: WorkshopRegistration): void {
    this._bsModalService.openModal({
      title: 'Editar Inscripción',
      options: { size: 'lg', centered: true },
      component: CreateEditWorkshopRegistrationComponent,
      data: {
        registrationData: registration,
        isEdit: true,
      },
    });
  }

  openViewModal(registration: WorkshopRegistration): void {
    this._bsModalService.openModal({
      title: 'Detalles del Registro al Taller',
      options: { size: 'lg', centered: true },
      component: ViewWorkshopRegistrationComponent,
      data: {
        workshopRegistration: registration,
      },
    });
  }

  deleteRegistration(id: string): void {
    if (confirm('¿Está seguro de que desea eliminar esta inscripción?')) {
      this.subscriptions.add(
        this.registrationService.deleteRegistration(id).subscribe(() => {
          this.reloadTable();
        })
      );
    }
  }

  trackByRegistrationId(index: number, registration: WorkshopRegistration): string {
    return registration._id;
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
