// table-group.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { GroupService } from '../../../../../core/services/group.service';
import { GroupDisplay } from '../../../../../core/interfaces/group.interface';
import { BootstrapModalConfig } from '../../../../../core/interfaces/IBootstrapModal.interface';
import { BootstrapModalService } from '../../../../../core/services/boostrap-modal.service';
import { ViewGroupComponent } from '../../forms/view-group/view-group/view-group.component';
import { FilterCommunicationService } from '../../../../../core/services/filter-communication.service';

@Component({
  selector: 'app-table-group',
  templateUrl: './table-group.component.html',
  styleUrls: ['./table-group.component.scss'],
})
export class TableGroupComponent implements OnInit, OnDestroy {
  public isLoading = true;
  public groups: GroupDisplay[] = [];
  public collectionSize = 0;
  public page = 1;
  public limit = 10;
  private subscriptions: Subscription[] = [];

  private currentFilters: any = {};

  constructor(
    private groupService: GroupService,
    private _bsModalService: BootstrapModalService,
    private filterCommunicationService: FilterCommunicationService
  ) {}

  ngOnInit(): void {
    this.loadGroups();
    this.listenToModalClose();
    this.subscribeToFilterChanges();
  }

  subscribeToFilterChanges(): void {
    const filterSub = this.filterCommunicationService.currentFilter.subscribe(
      (filters) => {
        console.log('Filtros recibidos en TableGroupComponent:', filters);
        if (filters !== null) {
          this.currentFilters = filters;
          this.page = 1; // Resetear a la primera página
          this.loadGroups();
        } else {
          // Si los filtros son null, significa que se reseteó el filtro
          this.currentFilters = {};
          this.page = 1;
          this.loadGroups();
        }
      }
    );
    this.subscriptions.push(filterSub);
  }

  loadGroups(): void {
    console.log('Cargando grupos con filtros:', this.currentFilters);
    this.isLoading = true;
    const subscription = this.groupService
      .getAllGroups(this.page, this.limit, this.currentFilters)
      .subscribe({
        next: (response) => {
          console.log('Datos de grupos cargados:', response.data.result);
          this.groups = response.data.result.map((group) => ({
            ...group,
            membersNames: this.formatMembers(group.members || []),
            preferredTutorsNames: this.formatTutors(group.enrollments || []),
            developmentMechanismName:
              group.enrollments[0]?.developmentMechanism?.name || 'N/A',
            modalityName: group.enrollments[0]?.modality?.name || 'N/A',
            topicTitle: group.enrollments[0]?.topicTitle || 'N/A',
            createdAt: group.createdAt,
          }));
          this.collectionSize = response.data.totalCount;
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error al cargar datos de grupos:', error);
          this.isLoading = false;
        },
      });
    this.subscriptions.push(subscription);
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

  formatTutors(enrollments: any[]): string {
    const tutors = enrollments.reduce((acc: string[], enroll) => {
      const tutorNames = (enroll.preferredTutors || []).map(
        (tutor: { name: any }) => tutor.name
      );
      return acc.concat(tutorNames);
    }, []);
    const uniqueTutors = Array.from(new Set(tutors));
    return uniqueTutors.join(', ') || 'N/A';
  }

  formatMembers(members: { name: string; lastName: string }[]): string {
    return (
      members.map((member) => `${member.name} ${member.lastName}`).join(', ') ||
      'N/A'
    );
  }

  openViewGroupModal(group: GroupDisplay): void {
    console.log('Abriendo modal para el grupo:', group);
    const modalConfig: BootstrapModalConfig = {
      title: 'Detalles del Grupo',
      options: { size: 'xl', centered: true },
      component: ViewGroupComponent,
      data: group,
    };
    this._bsModalService.openModal(modalConfig);
  }

  reloadTable(): void {
    this.loadGroups();
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

  onPageChange(page: number): void {
    this.page = page;
    console.log('Cambio de página:', this.page);
    this.loadGroups();
  }

  onLimitChange(limit: number): void {
    this.limit = limit;
    console.log('Cambio de límite de registros por página:', this.limit);
    this.loadGroups();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  trackByGroupId(index: number, group: GroupDisplay): string {
    return group._id;
  }
}
