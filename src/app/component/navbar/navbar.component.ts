import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  constructor(private router: Router) { }

  isLoggedIn!: boolean;

  OnLogOut() {
    localStorage.removeItem('authToken');
    localStorage.setItem('isLoggedIn', 'false');
    this.isLoggedIn = false;
    this.router.navigate(['/']);
  }  
}
