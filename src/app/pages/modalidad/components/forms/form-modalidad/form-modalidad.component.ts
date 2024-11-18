import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EnrollmentService } from '../../../../../core/services/enrollment.service';
import { Enrollment } from '../../../../../core/interfaces/enrollment.interface';
import { ToastrService } from 'ngx-toastr';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BootstrapModalService } from '../../../../../core/services/boostrap-modal.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-form-modalidad',
  templateUrl: './form-modalidad.component.html',
  styleUrls: ['./form-modalidad.component.scss'],
})
export class FormModalidadComponent implements OnInit, OnDestroy {
  isEdit = false;
  enrollmentData: Enrollment | null = null;

  enrollmentForm: FormGroup;
  modalities: Array<{ _id: string; name: string }> = [];
  developmentTypes: Array<{ _id: string; name: string }> = [];
  tutors: Array<{ _id: string; name: string }> = [];
  availableStudents: Array<{ _id: string; fullName: string }> = [];
  isLoading = false;
  isLoadingModalities = false;
  isLoadingDevelopmentTypes = false;
  isLoadingTutors = false;
  isLoadingStudents = false;
  showPartnerSelection = false;
  private subscriptions: Subscription[] = [];

  constructor(
    private fb: FormBuilder,
    private enrollmentService: EnrollmentService,
    private toastr: ToastrService,
    public activeModal: NgbActiveModal,
    private bootstrapModalService: BootstrapModalService
  ) {
    this.enrollmentForm = this.fb.group({
      topicTitle: ['', Validators.required],
      problemDescription: ['', Validators.required],
      modality: [null, Validators.required],
      developmentType: [null, Validators.required],
      partner: [null],
      preferredTutors: [
        [],
        [Validators.required, Validators.minLength(1), Validators.maxLength(3)],
      ],
    });
  }

  ngOnInit(): void {
    this.getModalData();
    this.loadRelatedData();
  }

  getModalData(): void {
    this.subscriptions.push(
      this.bootstrapModalService.getDataIssued().subscribe((data) => {
        this.isEdit = data.isEdit;
        this.enrollmentData = data.enrollmentData;
        console.log('Modal data received:', data);
      })
    );
  }

  loadRelatedData(): void {
    const userId = '67310a9457493987b0c28de2'; // Simulate logged-in user ID

    this.isLoadingModalities = true;
    this.isLoadingDevelopmentTypes = true;
    this.isLoadingTutors = true;
    this.isLoadingStudents = true;

    const modalitiesSub = this.enrollmentService.getModalities().subscribe(
      (modalities) => {
        this.modalities = modalities;
        this.isLoadingModalities = false;
        this.checkIfEditMode();
      },
      () => {
        this.isLoadingModalities = false;
      }
    );
    this.subscriptions.push(modalitiesSub);

    const developmentTypesSub = this.enrollmentService.getDevelopmentTypes().subscribe(
      (developmentTypes) => {
        this.developmentTypes = developmentTypes;
        this.isLoadingDevelopmentTypes = false;
        this.checkIfEditMode();
      },
      () => {
        this.isLoadingDevelopmentTypes = false;
      }
    );
    this.subscriptions.push(developmentTypesSub);

    const tutorsSub = this.enrollmentService.getTutors().subscribe(
      (tutors) => {
        this.tutors = tutors;
        this.isLoadingTutors = false;
      },
      () => {
        this.isLoadingTutors = false;
      }
    );
    this.subscriptions.push(tutorsSub);

    const studentsSub = this.enrollmentService.getAvailableStudents().subscribe(
      (students) => {
        this.availableStudents = students
          .filter((student) => student._id !== userId)
          .map((student) => ({
            _id: student._id,
            fullName: `${student.name} ${student.lastName}`,
          }));
        this.isLoadingStudents = false;
      },
      () => {
        this.isLoadingStudents = false;
      }
    );
    this.subscriptions.push(studentsSub);
  }

  checkIfEditMode(): void {
    if (
      this.isEdit &&
      this.enrollmentData &&
      this.modalities.length > 0 &&
      this.developmentTypes.length > 0
    ) {
      console.log('Editing enrollment:', this.enrollmentData);
      this.enrollmentForm.patchValue({
        topicTitle: this.enrollmentData.topicTitle,
        problemDescription: this.enrollmentData.problemDescription,
        modality: this.enrollmentData.modality?._id || null,
        developmentType: this.enrollmentData.developmentMechanism?._id || null,
        partner: this.enrollmentData.partner?._id || null,
        preferredTutors:
          this.enrollmentData.preferredTutors?.map((tutor) => tutor._id) || [],
      });

      const developmentTypeId =
        this.enrollmentData.developmentMechanism?._id || null;
      const selectedDevelopmentType = this.developmentTypes.find(
        (type) => type._id === developmentTypeId
      );

      console.log(
        'Selected development type in checkIfEditMode:',
        selectedDevelopmentType
      );

      this.onDevelopmentTypeChange(selectedDevelopmentType);
    }
  }

  onDevelopmentTypeChange(event: any): void {
    console.log('onDevelopmentTypeChange event:', event);
    const developmentType = event;
    this.updatePartnerSelectionVisibility(developmentType);
  }

  updatePartnerSelectionVisibility(developmentType: any): void {
    console.log('updatePartnerSelectionVisibility developmentType:', developmentType);
    const isGroupType =
      developmentType && developmentType.name?.toLowerCase() === 'grupal';
    console.log('Is group type:', isGroupType);
    this.showPartnerSelection = isGroupType;
    const partnerControl = this.enrollmentForm.get('partner');
    if (isGroupType) {
      partnerControl?.setValidators([Validators.required]);
    } else {
      partnerControl?.clearValidators();
      partnerControl?.setValue(null);
    }
    partnerControl?.updateValueAndValidity();
  }

  onSubmit(): void {
    if (this.enrollmentForm.invalid) {
      this.toastr.error('Por favor, complete todos los campos obligatorios');
      return;
    }
    this.isLoading = true;
    const userId = '67310a9457493987b0c28de2'; // Simulate logged-in user ID

    const enrollmentData = {
      userId,
      topicTitle: this.enrollmentForm.value.topicTitle,
      problemDescription: this.enrollmentForm.value.problemDescription,
      modality: this.enrollmentForm.value.modality,
      developmentMechanism: this.enrollmentForm.value.developmentType,
      partner: this.enrollmentForm.value.partner,
      preferredTutors: this.enrollmentForm.value.preferredTutors,
    };

    console.log('onSubmit: Enrollment data to submit:', enrollmentData);

    if (this.isEdit && this.enrollmentData) {
      this.enrollmentService
        .updateEnrollment(this.enrollmentData._id, enrollmentData)
        .subscribe(
          () => this.onSuccess('actualizada'),
          () => this.onError('actualizar')
        );
    } else {
      this.enrollmentService.createEnrollment(enrollmentData).subscribe(
        () => this.onSuccess('creada'),
        () => this.onError('crear')
      );
    }
  }

  private onSuccess(action: string): void {
    this.toastr.success(`Inscripción ${action} con éxito`);
    this.isLoading = false;
    this.bootstrapModalService.updateModalClosed(true);
    this.activeModal.close(true);
  }

  private onError(action: string): void {
    this.toastr.error(`Error al ${action} la inscripción`);
    this.isLoading = false;
  }

  closeModal(): void {
    this.activeModal.dismiss();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
