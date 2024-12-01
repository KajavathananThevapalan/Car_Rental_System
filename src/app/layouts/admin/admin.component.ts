import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  isLoggedIn!: boolean;
  constructor(private router: Router){

  }

  OnLogOut(){
    localStorage.removeItem("token");
    localStorage.setItem('isLoggedIn', 'false');
    this.isLoggedIn = false;
    this.router.navigate(['']);
  }
}
