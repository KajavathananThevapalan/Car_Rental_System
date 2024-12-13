import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-home-nav',
  templateUrl: './home-nav.component.html',
  styleUrls: ['./home-nav.component.css']
})
export class HomeNavComponent {
  user: any = {};
  isLoggedIn: boolean = false;
  userName!: string;
  userId = localStorage.getItem('UserId');
  notifications: any;
  unreadCount: number = 0;
  isChangePasswordOpen: boolean = false;
  isDropdownOpen: boolean = false;

  constructor(private router: Router,
    private userService: UserService,
    private notificationService: NotificationService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (this.isLoggedIn) {
      this.getUserDetails();
      this.getNotifications();  // Load notifications initially
      // Polling to refresh notifications every 10 seconds (example)
      setInterval(() => {
        this.getNotifications();  // Refresh notifications
      }, 10000); // 10000ms = 10 seconds
    }
  }

  toggleLoginLogout() {
    if (this.isLoggedIn) {
      if (confirm('Are you sure you want to logout?')) {
        localStorage.setItem('isLoggedIn', 'false');
        this.isLoggedIn = false;
        localStorage.removeItem('UserId')
        localStorage.removeItem('authToken')
        this.router.navigate(['']);
      }
    } else {
      this.router.navigate(['/login']);
    }
  }

  getUserDetails(): void {
    this.userService.getUserById(Number(this.userId)).subscribe(
      (data) => {
        this.user = data;
        this.userName = data.firstName;
      },
      (error) => {
        this.toastr.error('Failed to load user');
      }
    );
  }

  viewAllNotifications(): void {
    this.router.navigate(['/notifications']);
  }

  getNotifications(): void {
    this.notificationService.GetAllNotificationByUserId(Number(this.userId)).subscribe(
      (data) => {
        this.notifications = data;
        this.unreadCount = this.notifications.filter((notification: any) => !notification.isRead).length;
      },
      (error) => {
        this.toastr.error('Failed to load notifications');
      }
    );
  }

  markAsRead(notificationId: number) {
    this.notificationService.MarkAsRead(notificationId).subscribe(
      (response) => {
        this.notifications = this.notifications.map((notification: any) => {
          if (notification.id === notificationId) {
            notification.isRead = true;
          }
          return notification;
        });
        this.unreadCount = this.notifications.filter((notification: any) => !notification.isRead).length;
        this.toastr.success('Notification marked as read');
      },
      (error) => {
        this.toastr.error('Failed to mark notification as read');
      }
    );
  }

  goBack(): void {
    this.router.navigate(['']);
  }

  editUser(userId: number): void {
    this.router.navigate([`/profile/edit/${userId}`]);
  }

  openChangePassword(): void {
    this.isChangePasswordOpen = true;
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
}
