import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  user: any = {};
  isLoading: boolean = true;
  errorMessage: string = '';

  constructor(
    private userService: UserService,
    private toastr: ToastrService,
    private router: Router
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
      },
      (error) => {
        this.isLoading = false;
        this.errorMessage = 'Failed to load user profile. Please try again later.';
        this.toastr.error(this.errorMessage);
      }
    );
  }

  editProfile(): void {
    this.router.navigate(['/edit-profile']);
  }
}
