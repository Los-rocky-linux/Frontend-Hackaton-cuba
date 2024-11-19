// filter-group.component.ts
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
      creationDate: [null],
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
    console.log('Cargando datos para los filtros...');

    // Cargar miembros
    const membersSub = this.enrollmentService.getAvailableStudents().subscribe({
      next: (members) => {
        this.members = members.map((member: any) => ({
          _id: member._id,
          fullName: `${member.name} ${member.lastName}`,
        }));
        console.log('Miembros cargados:', this.members);
      },
      error: (error) => {
        console.error('Error al cargar miembros:', error);
      },
    });
    this.subscriptions.push(membersSub);

    // Cargar modalidades
    const modalitiesSub = this.enrollmentService.getModalities().subscribe({
      next: (modalities) => {
        this.modalities = modalities;
        console.log('Modalidades cargadas:', this.modalities);
      },
      error: (error) => {
        console.error('Error al cargar modalidades:', error);
      },
    });
    this.subscriptions.push(modalitiesSub);

    // Cargar mecanismos de desarrollo
    const devMechSub = this.enrollmentService.getDevelopmentTypes().subscribe({
      next: (mechanisms) => {
        this.developmentMechanisms = mechanisms;
        console.log('Mecanismos de desarrollo cargados:', this.developmentMechanisms);
      },
      error: (error) => {
        console.error('Error al cargar mecanismos de desarrollo:', error);
      },
    });
    this.subscriptions.push(devMechSub);

    // Cargar tutores
    const tutorsSub = this.enrollmentService.getTutors().subscribe({
      next: (tutors) => {
        this.tutors = tutors;
        console.log('Tutores cargados:', this.tutors);
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
    console.log('Aplicando filtros:', filters);
    this.filterCommunicationService.changeFilter(filters);
  }

  resetFilters(): void {
    this.filterForm.reset();
    console.log('Filtros reseteados');
    this.filterCommunicationService.resetFilter();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
