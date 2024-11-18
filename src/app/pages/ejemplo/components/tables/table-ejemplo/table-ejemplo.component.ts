import { Component, OnInit } from '@angular/core';
import { FormEjemploComponent } from '../../forms/form-ejemplo/form-ejemplo.component';
import { BootstrapModalService } from '../../../../../core/services/boostrap-modal.service';

@Component({
  selector: 'app-table-ejemplo',
  templateUrl: './table-ejemplo.component.html',
  styleUrls: ['./table-ejemplo.component.scss'],
})
export class TableEjemploComponent implements OnInit {
  itemList = [
    {
      idPermission: 1,
      userId: 'Juan Pérez',
      permissionType: 'Vacaciones',
      state: 'Aprobado',
      initialDate: new Date('2023-01-01'),
      finalDate: new Date('2023-01-10'),
      approverUserId: 'Ana González',
      created: new Date('2022-12-15'),
      updated: new Date('2022-12-16'),
      observations: 'Permiso de vacaciones anuales.',
    },
    {
      idPermission: 2,
      userId: 'María López',
      permissionType: 'Permiso Médico',
      state: 'Pendiente',
      initialDate: new Date('2023-02-05'),
      finalDate: new Date('2023-02-07'),
      approverUserId: 'Carlos Sánchez',
      created: new Date('2023-01-20'),
      updated: new Date('2023-01-22'),
      observations: 'Permiso médico por cirugía menor.',
    },
    {
      idPermission: 3,
      userId: 'Carlos Martínez',
      permissionType: 'Día Personal',
      state: 'Rechazado',
      initialDate: new Date('2023-03-10'),
      finalDate: new Date('2023-03-10'),
      approverUserId: 'Laura Rivera',
      created: new Date('2023-02-28'),
      updated: new Date('2023-03-01'),
      observations: 'Solicitud de día personal.',
    },
  ];
  constructor(
    private _bsModalService: BootstrapModalService,
  ) {}

  collectionSize = 30;
  isLoading = false;

  ngOnInit(): void {}

  openCreatePermissionModal(): void {
    setTimeout(() => {
      const modalConfig = {
        title: 'Crear Permiso',
        options: { size: 'xl', centered: true },
        component: FormEjemploComponent,
        data: {
          permissionData: null,
          isEdit: false,
        },
      };
      this._bsModalService.openModal(modalConfig);
    }, 1);
  }

  exportToExcel() {
    console.log('Exportando a Excel');
  }

  viewDetails(item: any) {
    console.log('Viendo detalles del ítem:', item);
  }

  deleteItem(item: any) {
    console.log('Eliminando ítem:', item);
  }

  editItem(item: any) {
    console.log('Editando ítem:', item);
  }

  onPageChange(page: number) {
    console.log('Cambio de página a:', page);
  }

  onLimitChange(limit: number) {
    console.log('Cambio de límite a:', limit);
  }
}
