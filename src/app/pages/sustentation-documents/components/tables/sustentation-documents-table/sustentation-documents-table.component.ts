import { Component, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { SustentationDocumentService } from '../../../../../core/services/global/sustentation-document.service';
import { FormModalSustentationComponent } from '../../forms/sustentation-documents-form-modal/sustentation-documents-form-modal.component';
import Swal from "sweetalert2";
import { ApiResponse } from '../../../../../core/interfaces/api-response.interface';
import { SustentationDocument } from '../../../../../core/interfaces/sustentation.interface';

@Component({
  selector: 'app-table-sustentation-documents',
  templateUrl: './sustentation-documents-table.component.html',
  styleUrls: ['./sustentation-documents-table.component.scss'],
})
export class TableSustentationDocumentsComponent implements OnInit {
  public isLoading = true;
  public tutorDocumentList: SustentationDocument[] = [];
  public collectionSize = 0;
  public page = 1;
  public limit = 10;

  constructor(
    private sustentationDocumentService: SustentationDocumentService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.loadTutorDocuments();
  }

  loadTutorDocuments(): void {
    this.isLoading = true;
    // @ts-ignore
    this.sustentationDocumentService.getAllSustentationDocuments(this.page, this.limit).subscribe({
      complete(): void {
      },
      next: (response: ApiResponse<SustentationDocument>) => {
        this.isLoading = false;
        this.tutorDocumentList = response.data.result;
        this.collectionSize = response.data.totalCount;
      },
      error: () => {
        this.isLoading = false;
        Swal.fire("Error", "No se pudieron cargar los documentos.", "error");
      }
    });
  }

  openUploadModal(): void {
    const modalRef = this.modalService.open(FormModalSustentationComponent);
    modalRef.componentInstance.save.subscribe((newDocuments: SustentationDocument[]) => {
      const formData = new FormData();
      newDocuments.forEach(doc => {
        // @ts-ignore
        formData.append('documents', doc);
      });

      this.sustentationDocumentService.uploadDocuments(formData).subscribe({
        next: () => {
          this.loadTutorDocuments();
        },
        error: () => {
          Swal.fire("Error", "Hubo un error al cargar los documentos.", "error");
        }
      });
    });
  }

  deleteDocument(item: SustentationDocument): void {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¡No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, borrar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        this.sustentationDocumentService.deleteSustentationDocument(item.id).subscribe(() => {
          this.loadTutorDocuments();
          Swal.fire("¡Borrado!", "El documento ha sido borrado.", "success");
        });
      }
    });
  }

  editDocument(item: SustentationDocument): void {
    const modalRef = this.modalService.open(FormModalSustentationComponent);
    modalRef.componentInstance.document = item;

    modalRef.componentInstance.save.subscribe((updatedDocument: SustentationDocument) => {
      this.sustentationDocumentService.updateSustentationDocument(item.id, updatedDocument).subscribe({
        next: () => {
          this.loadTutorDocuments();
        },
        error: () => {
          Swal.fire('Error', 'No se pudo actualizar el documento.', "error");
        }
      });
    });
  }

  reloadTable(): void {
    this.loadTutorDocuments();
  }

  onPageChange(page: number): void {
    this.page = page;
    this.loadTutorDocuments();
  }

  onLimitChange(limit: number): void {
    this.limit = limit;
    this.loadTutorDocuments();
  }
}
