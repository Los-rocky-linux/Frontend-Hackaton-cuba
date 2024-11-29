import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../../../core/services/global/user.service';
import { User } from '../../../../../core/interfaces/global/user.interface';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss'],
})
export class MyAccountComponent implements OnInit {
  public userName: string = 'Loading...';
  public userRole: string = 'Loading...';
  public profileImg: string = 'assets/images/dashboard/profile.jpg';

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit() {
    const currentUser: User | null = this.userService.getCurrentUser();

    if (currentUser) {
      this.userName = `${currentUser.name} ${currentUser.lastName}`;
      this.userRole = currentUser.rol.roleName || 'Unknown Role';
    } else {
      this.userName = 'Guest';
      this.userRole = 'Unknown';
    }
  }

  logoutFunc() {
    // Limpiar el token y redirigir al login
    localStorage.removeItem('authToken');
    this.router.navigateByUrl('auth/login');
  }
}
