import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../../core/services/global/user.service';
import { User } from '../../../../../core/interfaces/global/user.interface';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
})
export class UserInfoComponent implements OnInit {
  currentUser: User | null = null;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.currentUser = this.userService.getCurrentUser();

    this.userService.currentUser$.subscribe((user) => {
      this.currentUser = user;
    });
  }
}
