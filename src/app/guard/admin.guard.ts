import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthorizationService } from '../services/authorization.service';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private authService: AuthorizationService, private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('authToken');
    if (!token) {
      this.router.navigate(['/login']);
      return false;
    }

    const decodedToken: any = jwtDecode(token);
    if (decodedToken.UserRole === 'admin') {
      return true; // Allow access to the admin page
    } else {
      this.router.navigate(['/']); // Redirect to homepage if not admin
      return false;
    }
  }
}
