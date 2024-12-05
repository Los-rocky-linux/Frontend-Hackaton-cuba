import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { EnrollmentService } from '../../../../../core/services/enrollment.service';
import { FilterCommunicationService } from '../../../../../core/services/filter-communication.service';

@Component({
  selector: 'app-filter-group',
  templateUrl: './filter-group.component.html',
  styleUrls: ['./filter-group.component.scss'],
})
export class FilterGroupComponent implements OnInit, OnDestroy {
  filterForm: FormGroup;
  members: any[] = [];
  modalities: any[] = [];
  developmentMechanisms: any[] = [];
  tutors: any[] = [];
  isExpanded = false;

  private subscriptions: Subscription[] = [];

  constructor(
    private fb: FormBuilder,
    private enrollmentService: EnrollmentService,
    private filterCommunicationService: FilterCommunicationService
  ) {
    this.filterForm = this.fb.group({
      members: [null],
      modality: [null],
      developmentMechanism: [null],
      topicTitle: [''],
      preferredTutors: [null],
    });
  }

  ngOnInit(): void {
    this.loadFilterData();
  }

  loadFilterData(): void {
    const membersSub = this.enrollmentService.getAvailableStudents().subscribe({
      next: (members) => {
        this.members = members.map((member: any) => ({
          _id: member._id,
          fullName: `${member.name} ${member.lastName}`,
        }));
      },
      error: (error) => {
        console.error('Error al cargar miembros:', error);
      },
    });
    this.subscriptions.push(membersSub);

    const modalitiesSub = this.enrollmentService.getModalities().subscribe({
      next: (modalities) => {
        this.modalities = modalities;
      },
      error: (error) => {
        console.error('Error al cargar modalidades:', error);
      },
    });
    this.subscriptions.push(modalitiesSub);

    const devMechSub = this.enrollmentService.getDevelopmentTypes().subscribe({
      next: (mechanisms) => {
        this.developmentMechanisms = mechanisms;
      },
      error: (error) => {
        console.error('Error al cargar mecanismos de desarrollo:', error);
      },
    });
    this.subscriptions.push(devMechSub);

    const tutorsSub = this.enrollmentService.getTutors().subscribe({
      next: (tutors) => {
        this.tutors = tutors;
      },
      error: (error) => {
        console.error('Error al cargar tutores:', error);
      },
    });
    this.subscriptions.push(tutorsSub);
  }

  toggleExpand(): void {
    this.isExpanded = !this.isExpanded;
  }

  applyFilters(): void {
    const filters = this.filterForm.value;
    this.filterCommunicationService.changeFilter(filters);
  }

  resetFilters(): void {
    this.filterForm.reset();
    this.filterCommunicationService.resetFilter();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
