import { Injectable } from '@angular/core';
import { CanActivate, CanActivateFn, Router } from '@angular/router';
import { AuthorizationService } from './services/authorization.service';

@Injectable({
  providedIn:'root'
})

export class AuthGuard implements CanActivate{

  constructor(private authService: AuthorizationService,private router: Router){ }

  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
