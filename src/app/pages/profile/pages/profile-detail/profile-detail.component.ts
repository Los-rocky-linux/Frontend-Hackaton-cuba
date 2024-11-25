import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-profile-detail",
  templateUrl: "./profile-detail.component.html",
  styleUrls: ["./profile-detail.component.scss"],
})
export class ProfileDetailComponent implements OnInit {
  user: any = {}; // Contendrá los datos del usuario

  constructor(private router: Router) {}

  ngOnInit() {
    // Obtener los datos del usuario almacenados en localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      this.user = JSON.parse(storedUser);
    } else {
      // Si no hay datos del usuario, redirigir al login
      this.router.navigate(["/login"]);
    }
  }

  logout() {
    // Eliminar los datos de la sesión
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");

    // Redirigir al login
    this.router.navigate(["/login"]);
  }
}
