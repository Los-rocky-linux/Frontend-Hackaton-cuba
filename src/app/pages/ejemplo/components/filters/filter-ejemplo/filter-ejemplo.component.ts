import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-filter-ejemplo',
  templateUrl: './filter-ejemplo.component.html',
  styleUrl: './filter-ejemplo.component.scss',
})
export class FilterEjemploComponent {
  filterForm: FormGroup;
  isExpanded: boolean = true;

  // Dummy data for dropdowns
  accountTypes: string[] = ['Type 1', 'Type 2', 'Type 3'];
  accountCategories: string[] = ['Category 1', 'Category 2', 'Category 3'];

  constructor(private fb: FormBuilder) {
    this.filterForm = this.fb.group({
      accountName: [''],
      accountType: [''],
      accountCategory: [''],
    });
  }

  toggleExpand() {
    this.isExpanded = !this.isExpanded;
  }

  resetForm() {
    this.filterForm.reset();
  }

  applyFilter() {
    // No functionality added for now
  }
}
