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
    if (this.authService.isLoggedIn()) {
      const token = localStorage.getItem('authToken');

      if (token) {
        const decoded: any = jwtDecode(token);
        console.log(decoded.UserRole);

        if (decoded.UserRole === 'admin') {
          return true;
        } else {
          this.router.navigate(['/']);
          return false;
        }
      } else {
        this.router.navigate(['/login']);
        return false;
      }
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}