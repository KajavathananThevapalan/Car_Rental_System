import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { RentalService } from '../../services/rental.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  user: any = {};
  rentals: any = {};
  isLoading: boolean = true;
  errorMessage: string = '';

  constructor(
    private userService: UserService,
    private toastr: ToastrService,
    private router: Router,
    private rentalService : RentalService,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.getUserDetails();
  }

  getUserDetails(): void {
    this.isLoading = true;
    const userId = localStorage.getItem('UserId')
    this.userService.getUserById(Number(userId)).subscribe(
      (data) => {
        console.log(data);
        
        this.isLoading = false;
        this.user = data;
        this.getUserRentals(this.user.userId)
      },
      (error) => {
        this.isLoading = false;
        this.errorMessage = 'Failed to load user profile. Please try again later.';
        this.toastr.error(this.errorMessage);
      }
    );
  }

  getUserRentals(userId: number): void {
    this.isLoading = true;
    console.log(userId);
    this.rentalService.getRentalsByUser(userId).subscribe(
      (data) => {
        console.log(data);
        
        this.isLoading = false;
        this.rentals = data;
      },
      (error) => {
        this.isLoading = false;
        this.toastr.error('Failed to load rentals. Please try again.');
        console.error('Error fetching rentals:', error);
      }
    );
  }

  editProfile(): void {
    this.router.navigate(['/edit-profile']);
  }
}
