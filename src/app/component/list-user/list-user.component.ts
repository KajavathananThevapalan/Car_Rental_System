import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../services/user.service';
import { User } from '../../models/User';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrl: './list-user.component.css'
})

export class ListUserComponent implements OnInit {
  searchInput = '';

  users: any[] = []; // Array to hold the users
  isLoading: boolean = true; // Flag to show loading indicator
  errorMessage: string = ''; // To hold error messages if needed

  constructor(
    private userService: UserService, // Inject the UserService to communicate with the backend
    private toastr: ToastrService, // Inject Toastr for showing notifications
    private router: Router // For navigation
  ) { }

  ngOnInit(): void {
    this.getUsers(); // Call the method to fetch the list of users
  }

  // Method to fetch users from the service
  getUsers(): void {
    this.isLoading = true; // Start loading
    this.userService.getUsers().subscribe(
      (data) => {
        this.isLoading = false; // Stop loading
        this.users = data; // Assign the fetched data to users
        // console.log('Users fetched:', this.users);
      },
      (error) => {
        this.isLoading = false; // Stop loading
        this.errorMessage = 'Failed to load users. Please try again later.';
        console.error('Error fetching users:', error);
        this.toastr.error('Error fetching users. Please try again.');
      }
    );
  }

  // Method to view user details
  viewUser(userId: number): void {
    // console.log('Navigating to user with ID:', userId);
    this.router.navigate([`/admin/user/${userId}`]); // Ensure the path is correct
  }

  // Method to delete a user
  deleteUser(userId: number): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(userId).subscribe(
        () => {
          this.toastr.success('User deleted successfully');
          this.getUsers(); // Refresh the user list
        },
        (error) => {
          this.toastr.error('Error deleting user. Please try again.');
          console.error('Error while deleting user:', error);
        }
      );
    }
  }
}