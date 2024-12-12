import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { CarDetails } from "../../../models/CarDetails";
import { UserService } from "../../../services/user.service";
import { User } from "../../../models/User";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isLoggedIn: boolean = false;
  searchQuery: string = '';
  cars: CarDetails[] = [];
  profile!: any;
  email!: any;
  name!: any;
  totalCustomers!: number;

  constructor(private router: Router, private route: ActivatedRoute, private userService : UserService, private toastr: ToastrService) { }

  ngOnInit() {
    this.isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (this.isLoggedIn){
      this. getUserDetails();
    }
    console.log(this.cars.length);
    
  }

  getUserDetails(): void {
    const userId = localStorage.getItem('UserId')
    this.userService.getUserById(Number(userId)).subscribe(
      (data) => {
        console.log(data);        
        this.profile = data.profileImage;
        this.email = data.email
        this.name = data.firstName
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
