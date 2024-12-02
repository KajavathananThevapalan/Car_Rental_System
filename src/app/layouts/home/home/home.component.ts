import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isLoggedIn: boolean = false;

  constructor(private router: Router) { }

  ngOnInit() {
    this.isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  }

  toggleLoginLogout() {
    if (this.isLoggedIn) {
      localStorage.setItem('isLoggedIn', 'false');
      if (confirm('Are you sure you want to logout?')) {
        this.isLoggedIn = false;
        this.router.navigate(['']);
      }
    } else {
      this.router.navigate(['/login']);
    }
  }

  navigateToRegister() {
    this.router.navigate(['/register']);
  }
}
