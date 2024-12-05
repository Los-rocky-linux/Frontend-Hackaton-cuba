import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  AfterViewInit,
  ChangeDetectorRef,
} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { User } from "../../../../../core/interfaces/global/user.interface";
import { RoleService } from "../../../../../core/services/global/role.service";
import { Role } from "../../../../../core/constants/global/role.interface";

@Component({
  selector: "app-form-modal-user",
  templateUrl: "./form-modal-user.component.html",
  styleUrls: ["./form-modal-user.component.scss"],
})
export class FormModalUserComponent implements OnInit, AfterViewInit {
  @Input() user?: User;
  @Output() save = new EventEmitter<User>();

  form: FormGroup;
  roles: Role[] = [];
  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    private roleService: RoleService,
    public activeModal: NgbActiveModal,
    private cdr: ChangeDetectorRef
  ) {
    this.form = this.fb.group({
      name: ["", Validators.required],
      lastName: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      phone: ["", Validators.required],
      rol: ["", Validators.required],
      password: ["", Validators.required],
      microsoftId: ["", Validators.required],
      status: [true, Validators.required],
    });
  }

  ngOnInit() {
    this.loadRoles();
    if (this.user) {
      this.isEditMode = true;
      this.form.patchValue(this.user);
    }
  }

  ngAfterViewInit() {
    this.cdr.detectChanges();
  }

  loadRoles() {
    this.roleService.getAllRoles().subscribe(
      (roles) => {
        this.roles = roles;
      },
      (error) => {
        console.error("Error al cargar los roles", error);
      }
    );
  }

  onSubmit() {
    if (this.form.valid) {
      this.save.emit(this.form.getRawValue());
      this.activeModal.close();
    }
  }
}
