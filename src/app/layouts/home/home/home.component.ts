import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { CarDetails } from "../../../models/CarDetails";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isLoggedIn: boolean = false;
  searchQuery: string = '';
  cars: CarDetails[] = [];

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

  goToProfile(){
    this.router.navigate(['/profile'])
  }

  navigateToRegister() {
    this.router.navigate(['/register']);
  }

  filteredCars() {
    if (!this.searchQuery) {
      return this.cars;
    }

    return this.cars.filter(car =>
      car.registrationNumber.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      car.licensePlate.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }
}
