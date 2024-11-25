import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { UserService } from "../../../core/services/global/user.service";
import { catchError } from "rxjs/operators";
import { of } from "rxjs";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public show: boolean = false;
  public errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService
  ) {
    this.loginForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required],
    });
  }

  ngOnInit() {}

  showPassword() {
    this.show = !this.show;
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      this.userService
        .login(email, password)
        .pipe(
          catchError((error) => {
            // Manejar errores
            this.errorMessage =
              error.error.message || "Error al iniciar sesión.";
            return of(null);
          })
        )
        .subscribe((response) => {
          if (response && response.data) {
            const { token, user } = response.data;

            // Guardar el token en localStorage
            localStorage.setItem("authToken", token);

            // Redirigir al perfil del usuario
            this.router.navigate(["/dashboard"]);
          }
        });
    }
  }
}
