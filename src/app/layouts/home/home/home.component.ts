import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isLoggedIn: boolean = false; // Track whether the user is logged in or not

  constructor(private router: Router) { }

  ngOnInit() {
    // Check the login status when the component initializes
    this.isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  }

  // Toggle login/logout state
  toggleLoginLogout() {
    if (this.isLoggedIn) {
      // Log the user out
      localStorage.setItem('isLoggedIn', 'false');
      if (confirm('Are you sure you want to logout?')) {
        this.isLoggedIn = false;
        this.router.navigate(['']);
      }
    } else {
      // Navigate to the login page if not logged in
      this.router.navigate(['/login']);
    }
  }

  // Navigate to the register page (this function would typically redirect the user to the register component)
  navigateToRegister() {
    this.router.navigate(['/register']);
  }
}
