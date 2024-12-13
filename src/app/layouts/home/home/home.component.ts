import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { CarDetails } from "../../../models/CarDetails";
import { UserService } from "../../../services/user.service";
import { CarService } from "../../../services/car.service";
import { RentalService } from "../../../services/rental.service";
import { User } from "../../../models/User";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isLoggedIn: boolean = false;
  searchQuery: string = '';
  cars: CarDetails[] = [];
  users: User[] = [];
  totalCars!: any;
  totalReviews!: any;
  totalRents!: any;
  totalCustomers!: number;
  name!: string
  userId = localStorage.getItem('UserId');
  notifications: any;

  constructor(private router: Router,
    private userService: UserService,
    private carService: CarService,
    private rentalService: RentalService,
  ) { }

  ngOnInit() {
    this.getCountData();
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

  getCountData(): void {
    this.userService.getUsers().subscribe((data) => {
      this.users = data;
      this.totalCustomers = data.length;
    });

    // this.modelService.getModels().subscribe((count) => {
    //   this.totalReviews = count.length;
    // });

    this.carService.getCars().subscribe((count) => {
      this.totalCars = count.length;
    });

    this.rentalService.getrentals().subscribe((count) => {
      this.totalRents = count.length;
    });
  }
}
