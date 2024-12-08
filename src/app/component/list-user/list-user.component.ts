import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {

  searchQuery: string = '';
  users: any[] = [];
  isLoading: boolean = true;
  errorMessage: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalItems: number = 0;
  paginatedUsers: any[] = [];

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
        this.totalItems = this.users.length;
        this.filterUsers();
      },
      (error) => {
        this.isLoading = false;
        this.errorMessage = 'Failed to load users. Please try again later.';
        console.error('Error fetching users:', error);
        this.toastr.error('Error fetching users. Please try again.');
      }
    );
  }

  filterUsers(): void {
    let filteredUsers = this.users;
    if (this.searchQuery) {
      filteredUsers = this.users.filter(user =>
        user.firstName.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        user.nic.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }

    this.paginateUsers(filteredUsers);
  }

  paginateUsers(filteredUsers: any[]): void {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedUsers = filteredUsers.slice(start, end);
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages()) {
      this.currentPage = page;
      this.filterUsers();
    }
  }

  totalPages(): number {
    return Math.ceil(this.users.length / this.itemsPerPage);
  }

  viewUser(userId: number): void {
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
