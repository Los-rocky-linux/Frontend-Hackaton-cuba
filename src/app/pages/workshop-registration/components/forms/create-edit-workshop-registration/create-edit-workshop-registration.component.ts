import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WorkshopRegistrationService } from '../../../../../core/services/workshop-registration.service';
import { ToastrService } from 'ngx-toastr';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../../../../../core/services/global/user.service';
import { Subscription } from 'rxjs';
import { User } from '../../../../../core/interfaces/global/user.interface';
import { BootstrapModalService } from '../../../../../core/services/boostrap-modal.service';

@Component({
  selector: 'app-create-edit-workshop-registration',
  templateUrl: './create-edit-workshop-registration.component.html',
  styleUrls: ['./create-edit-workshop-registration.component.scss'],
})
export class CreateEditWorkshopRegistrationComponent implements OnInit, OnDestroy {
  isEdit = false;
  registrationData: any;

  workshopForm!: FormGroup;
  inductionPeriods: Array<{ _id: string; name: string }> = [];
  currentUser: User | null = null;
  private subscriptions: Subscription[] = [];

  constructor(
    private fb: FormBuilder,
    private registrationService: WorkshopRegistrationService,
    private toastr: ToastrService,
    private userService: UserService,
    public activeModal: NgbActiveModal,
    private _bsModalService: BootstrapModalService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.getCurrentUser();
    this.loadInductionPeriods();
    this.getModalData(); // Obtén los datos del modal.
  }

  initializeForm(): void {
    this.workshopForm = this.fb.group({
      inductionPeriod: [null, Validators.required],
      carrera: ['', Validators.required],
      nivelAprobado: [null, [Validators.required]],
      estado: ['activo', Validators.required],
    });
  }

  getCurrentUser(): void {
    this.currentUser = this.userService.getCurrentUser();
    if (!this.currentUser) {
      this.toastr.error('Debe iniciar sesión para realizar esta acción.');
      this.activeModal.dismiss();
    }
  }

  loadInductionPeriods(): void {
    const periodsSub = this.registrationService.getInductionPeriods().subscribe((periods) => {
      this.inductionPeriods = periods;
    });
    this.subscriptions.push(periodsSub);
  }

  getModalData(): void {
    // Suscríbete al servicio de datos del modal para obtener `isEdit` y `registrationData`.
    const dataSub = this._bsModalService.getDataIssued().subscribe((data) => {
      this.isEdit = data.isEdit;
      this.registrationData = data.registrationData;

      // Si es modo edición, carga los valores en el formulario.
      if (this.isEdit && this.registrationData) {
        this.patchFormValues();
      }
    });
    this.subscriptions.push(dataSub);
  }

  patchFormValues(): void {
    this.workshopForm.patchValue({
      inductionPeriod: this.registrationData.inductionPeriod?._id || null,
      carrera: this.registrationData.carrera,
      nivelAprobado: this.registrationData.nivelAprobado,
      estado: this.registrationData.estado,
    });
  }

  onSubmit(): void {
    if (this.workshopForm.invalid) {
      this.toastr.error('Por favor, complete todos los campos obligatorios.');
      return;
    }

    if (!this.currentUser) {
      this.toastr.error('Debe iniciar sesión para realizar esta acción.');
      return;
    }

    const formData = {
      userId: this.currentUser.id,
      ...this.workshopForm.getRawValue(),
    };

    if (this.isEdit) {
      this.registrationService
        .updateRegistration(this.registrationData._id, formData)
        .subscribe(
          () => this.onSuccess('actualizada'),
          (error) => this.onError('actualizar', error)
        );
    } else {
      this.registrationService.createRegistration(formData).subscribe(
        () => this.onSuccess('creada'),
        (error) => this.onError('crear', error)
      );
    }
  }

  private onSuccess(action: string): void {
    this.toastr.success(`Inscripción ${action} con éxito.`);
    this._bsModalService.updateModalClosedListener(); // Notifica que hubo cambios.
    this.activeModal.close();
  }

  private onError(action: string, error: any): void {
    this.toastr.error(`Error al ${action} la inscripción.`);
  }

  closeModal(): void {
    this.activeModal.dismiss();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
