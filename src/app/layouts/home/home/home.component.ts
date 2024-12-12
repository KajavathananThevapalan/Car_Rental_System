import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { CarDetails } from "../../../models/CarDetails";
import { UserService } from "../../../services/user.service";
import { ToastrService } from "ngx-toastr";
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
  userName!: string;
  totalCars!: any;
  totalReviews!: any;
  totalRents!: any;
  totalCustomers!: number;
  name!: string

  constructor(private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private carService: CarService,
    private rentalService: RentalService,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.getCountData();
    this.isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (this.isLoggedIn) {
      this.getUserDetails();
    }
    console.log(this.users);

  }

  getUserDetails(): void {
    const userId = localStorage.getItem('UserId')
    this.userService.getUserById(Number(userId)).subscribe(
      (data) => {
        this.userName = data.firstName;
      },
      (error) => {
        this.toastr.error('Failed to load user');
      }
    );
  }

  toggleLoginLogout() {
    if (this.isLoggedIn) {
      if (confirm('Are you sure you want to logout?')) {
        localStorage.setItem('isLoggedIn', 'false');
        this.isLoggedIn = false;
        localStorage.removeItem('UserId')
        localStorage.removeItem('authToken')
        this.router.navigate(['']);
      }
    } else {
      this.router.navigate(['/login']);
    }
  }

  goToProfile() {
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
