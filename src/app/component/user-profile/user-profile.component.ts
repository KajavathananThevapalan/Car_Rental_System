import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Rental } from '../../models/Rental';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  user: any = {};
  rentals: Rental[] = [];
  rentalsByStatus: { [key: string]: Rental[] } = {
    pending: [],
    declined: [],
    booked: [],
    rented: [],
    returned: []
  };
  isLoading: boolean = true;
  errorMessage: string = '';
  isChangePasswordOpen: boolean = false;
  currentPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  isLoggedIn: boolean = false;

  constructor(
    private userService: UserService,
    private toastr: ToastrService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (this.isLoggedIn) {
      this.getUserDetails();
    }
  }

  getUserDetails(): void {
    this.isLoading = true;
    const userId = localStorage.getItem('UserId');
    this.userService.getUserById(Number(userId)).subscribe(
      (data) => {
        this.isLoading = false;
        this.user = data;
        this.rentals = this.user.rentals || [];

        this.rentalsByStatus = {
          pending: this.rentals.filter(rental => rental.rentalStatus === 'Pending'),
          declined: this.rentals.filter(rental => rental.rentalStatus === 'Declined'),
          booked: this.rentals.filter(rental => rental.rentalStatus === 'Booked'),
          rented: this.rentals.filter(rental => rental.rentalStatus === 'Rented'),
          returned: this.rentals.filter(rental => rental.rentalStatus === 'Returned')
        };
      },
      (error) => {
        this.isLoading = false;
        this.errorMessage = 'Failed to load user profile. Please try again later.';
        this.toastr.error(this.errorMessage);
      }
    );
  }

  editUser(userId: number): void {
    this.router.navigate([`/profile/edit/${userId}`]);
  }

  openChangePassword(): void {
    this.isChangePasswordOpen = true;
  }

  closeChangePassword(): void {
    this.isChangePasswordOpen = false;
  }

  onSubmitPasswordChange(userId: number): void {
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

  toggleLoginLogout() {
    if (this.isLoggedIn) {
      if (confirm('Are you sure you want to logout?')) {
        console.log(1);

        localStorage.setItem('isLoggedIn', 'false');
        this.isLoggedIn = false;
        localStorage.removeItem('UserId')
        localStorage.removeItem('authToken')
        this.router.navigate(['']);
      }
    } else {
      console.log(2);

      this.router.navigate(['/login']);
    }
  }

  goBack(): void {
    this.router.navigate(['']);
  }
}