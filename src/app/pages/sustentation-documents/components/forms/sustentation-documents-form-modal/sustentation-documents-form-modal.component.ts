import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// @ts-ignore
import { SustentationDocumentService } from '../../../../../core/services/global/sustentation-document.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-modal-sustentation',
  templateUrl: './sustentation-documents-form-modal.component.html',
  styleUrls: ['./sustentation-documents-form-modal.component.scss']
})
export class FormModalSustentationComponent implements OnInit {
  form: FormGroup;
  tutorName: string = '';
  files: File[] = [];

  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private sustentationDocumentService: SustentationDocumentService
  ) {}

  ngOnInit(): void {
    // Inicializa el formulario con los campos necesarios
    this.form = this.fb.group({
      assignedTutor: [{ value: this.tutorName, disabled: true }],
      additionalDocuments: [null, Validators.required]
    });
  }

  onFileChange(event: any): void {
    if (event.target.files.length > 0) {
      this.files = Array.from(event.target.files);
      this.form.get('additionalDocuments')?.setValue(this.files);
    }
  }

  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }

    const formData = new FormData();
    this.files.forEach((file) => {
      formData.append('documents', file, file.name);
    });

    this.sustentationDocumentService.createSustentationDocument(formData).subscribe({
      next: (response) => {
        Swal.fire('Éxito', 'Documentos cargados correctamente.', 'success');
        this.activeModal.close('Documentos cargados');
      },
      error: (error) => {
        Swal.fire('Error', 'Hubo un error al cargar los documentos.', 'error');
      }
    });
  }
}
