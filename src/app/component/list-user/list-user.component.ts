import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { UserService } from "../../services/user.service";

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrl: './list-user.component.css'
})

export class ListUserComponent implements OnInit {
  searchInput = '';

  users: any[] = [];
  isLoading: boolean = true;
  errorMessage: string = '';

  constructor(
    private userService: UserService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.isLoading = true;
    this.userService.getUsers().subscribe(
      (data) => {
        this.isLoading = false;
        this.users = data;
        // console.log('Users fetched:', this.users);
      },
      (error) => {
        this.isLoading = false;
        this.errorMessage = 'Failed to load users. Please try again later.';
        console.error('Error fetching users:', error);
        this.toastr.error('Error fetching users. Please try again.');
      }
    );
  }

  viewUser(userId: number): void {
    // console.log('Navigating to user with ID:', userId);
    this.router.navigate([`/admin/user/${userId}`]);
  }

  deleteUser(userId: number): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(userId).subscribe(
        () => {
          this.toastr.success('User deleted successfully');
          this.getUsers();
        },
        (error) => {
          this.toastr.error('Error deleting user. Please try again.');
          console.error('Error while deleting user:', error);
        }
      );
    }
  }
}