import { Component, Input } from '@angular/core';
import { TableColumns } from '../../../../core/interfaces/components.interface';

@Component({
  selector: 'shared-basic-table',
  templateUrl: './basic-table.component.html',
})
export class BasicTableComponent {
  @Input({ required: true })
  public isLoading: boolean = true;

  @Input({ required: true })
  public tableColumns: TableColumns<any>[] = [];

  @Input({ required: true })
  public tableData: any[] | null = [];
}
