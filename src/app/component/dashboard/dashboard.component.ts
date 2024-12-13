import { Component, OnInit } from "@angular/core";
import { BrandService } from "../../services/brand.service";
import { CarService } from "../../services/car.service";
import { ModelService } from "../../services/model.service";
import { UserService } from "../../services/user.service";
import { User } from "../../models/User";
import { Car, Model, Brand } from "../../services/admin-service.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  // Data for the cards
  brands!: number;
  models!: number;
  cars!: number;
  customers!: number;

  // Personal, rental, and car details for the form
  name: string = '';
  nic: string = '';
  address: string = '';
  phone: string = '';
  email: string = '';
  rentalId: string = '';
  amount: string = '';
  brand: string = '';
  model: string = '';

  // Search term for user
  searchTerm: string = '';

  constructor(
    private userService: UserService, 
    private carService: CarService, 
    private brandService: BrandService, 
    private modelService: ModelService
  ) {}

  ngOnInit(): void {
    this.getDashboardData();
  }

  // Fetch dashboard data (counts)
  getDashboardData(): void {
    this.userService.getUsers().subscribe((users) => {
      this.customers = users.length;
    });

    this.modelService.getModels().subscribe((models) => {
      this.models = models.length;
    });

    this.carService.getCars().subscribe((cars) => {
      this.cars = cars.length;
    });

    this.brandService.getBrands().subscribe((brands) => {
      this.brands = brands.length;
    });
  }

  // Fetch user details based on the search term (user ID)
  searchUser(): void {
    if (this.searchTerm) {
      this.userService.getUserById(Number(this.searchTerm)).subscribe((user: User) => {
        if (user) {
          this.name = `${user.firstName} ${user.lastName}`;
          this.nic = user.nic;
          this.address = `${user.address.addressLine1}, ${user.address.addressLine2}, ${user.address.city}, ${user.address.district}`;
          this.phone = user.phone;
          this.email = user.email;

          // Check rentals and get the first rental (or any logic you need)
          if (user.rentals && user.rentals.length > 0) {
            this.rentalId = user.rentals[0].rentalId.toString(); // Use the first rental ID
            this.amount = (user.rentals[0].totalAmount).toString(); // Use the first rental amount

            // Fetch the car details based on carId
            const carId = user.rentals[0].carId;
            this.carService.getCar(carId).subscribe((car) => {
              if (car) {
                // Fetch the model details based on modelId from the car
                const modelId = car.modelId;
                this.modelService.getModel(modelId).subscribe((model: Model) => {
                  if (model) {
                    this.model = model.name; // Assuming the model has a 'name' property
                    // Fetch the brand details based on brandId from the model
                    const brandId = model.brandId;
                    this.brandService.getBrand(Number(brandId)).subscribe((brand: Brand) => {
                      if (brand) {
                        this.brand = brand.name; // Assuming the brand has a 'name' property
                      }
                    });
                  }
                });
              }
            });
          } else {
            this.rentalId = 'N/A';
            this.amount = 'N/A';
            this.model = 'N/A';
            this.brand = 'N/A';
          }
        } else {
          alert('User not found');
          this.clearUserDetails();
        }
      });
    }
  }

  // Clear user details if no user is found
  clearUserDetails(): void {
    this.name = '';
    this.nic = '';
    this.address = '';
    this.phone = '';
    this.email = '';
    this.rentalId = '';
    this.amount = '';
    this.brand = '';
    this.model = '';
  }
}
