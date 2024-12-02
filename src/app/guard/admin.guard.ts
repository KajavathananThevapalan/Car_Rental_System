import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { jwtDecode } from "jwt-decode";
import { AuthorizationService } from "../services/authorization.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthorizationService, private router: Router) { }

  canActivate(): boolean {
    // Check if the user is logged in
    if (this.authService.isLoggedIn()) {
      const token = localStorage.getItem('authToken'); // token can be a string or null
  
      // Check if the token exists
      if (token) {
        const decoded: any = jwtDecode(token); // Now it's safe to call jwtDecode
        console.log(decoded.UserRole);
  
        // Check the user's role
        if (decoded.UserRole === 'admin') {
          // Allow access to admin routes
          return true;
        } else {
          // Redirect to home or any other page
          this.router.navigate(['/']);
          return false;
        }
      } else {
        // Token doesn't exist (user is not logged in), redirect to login
        this.router.navigate(['/login']);
        return false;
      }
    } else {
      // If the user is not logged in, redirect to login
      this.router.navigate(['/login']);
      return false;
    }
  }  
}