import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
    constructor(private router: Router, private userService: UserService,  private toastr: ToastrService,) { }

  isLoggedIn!: boolean;
  isChangePasswordOpen: boolean = false;
  currentPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';

  logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('UserId');
    localStorage.setItem('isLoggedIn', 'false');
    this.isLoggedIn = false;
    this.router.navigate(['/']);
  }  

  openChangePassword(): void {
    this.isChangePasswordOpen = true;
  }

  closeChangePassword(): void {
    this.isChangePasswordOpen = false;
  }

  onSubmitPasswordChange(): void {
    const userId = Number(localStorage.getItem('UserId'))
    if (this.newPassword !== this.confirmPassword) {
      this.toastr.error('New Password and Confirm Password do not match.');
      return;
    }

    const passwordChangeRequest = {
      currentPassword: this.currentPassword,
      newPassword: this.newPassword,
      confirmNewPassword: this.confirmPassword
    };
    this.userService.changePassword(userId, passwordChangeRequest).subscribe(
      (response) => {
        this.toastr.success('Password changed successfully.');
        this.closeChangePassword();
      },
      (error) => {
        console.log(error.error.error)
        this.toastr.error(error.error.error);
      }
    );
  }
}
