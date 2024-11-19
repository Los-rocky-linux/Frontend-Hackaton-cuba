import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { GroupService } from '../../../../../core/services/group.service';
import {
  Group,
  GroupDisplay,
} from '../../../../../core/interfaces/group.interface';
import { BootstrapModalConfig } from '../../../../../core/interfaces/IBootstrapModal.interface';
import { BootstrapModalService } from '../../../../../core/services/boostrap-modal.service';
import { ViewGroupComponent } from '../../forms/view-group/view-group/view-group.component';

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

  constructor(
    private groupService: GroupService,
    private _bsModalService: BootstrapModalService
  ) {}

  ngOnInit(): void {
    this.loadGroups();
    this.listenToModalClose();
  }

  loadGroups(): void {
    console.log('Loading groups data...');
    this.isLoading = true;
    const subscription = this.groupService
      .getAllGroups(this.page, this.limit)
      .subscribe({
        next: (response) => {
          console.log('Groups data loaded:', response.data.result);
          this.groups = response.data.result.map((group) => ({
            ...group,
            membersNames: this.formatMembers(group.members || []),
            preferredTutorsNames: this.formatTutors(group.enrollments || []),
            developmentMechanismName:
              group.enrollments[0]?.developmentMechanism?.name || 'N/A',
            modalityName: group.enrollments[0]?.modality?.name || 'N/A',
            topicTitle: group.enrollments[0]?.topicTitle || 'N/A',
          }));
          this.collectionSize = response.data.totalCount;
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error loading groups data:', error);
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
    const modalConfig: BootstrapModalConfig = {
      title: 'Detalles del Grupo',
      options: { size: 'xl', centered: true },
      component: ViewGroupComponent,
      data: group,
    };
    this._bsModalService.openModal(modalConfig);
  }

  reloadTable(): void {
    console.log('Reloading table...');
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
    this.loadGroups();
  }

  onLimitChange(limit: number): void {
    this.limit = limit;
    this.loadGroups();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  trackByGroupId(index: number, group: GroupDisplay): string {
    return group._id;
  }
}
