import { Component, OnInit } from "@angular/core";
import { BrandService } from "../../services/brand.service";
import { CarService } from "../../services/car.service";
import { ModelService } from "../../services/model.service";
import { UserService } from "../../services/user.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  brands!: number;
  models!: number;
  cars!: number;
  customers!: number;

  constructor(private userService: UserService, private carService: CarService, private brandService: BrandService, private modelService: ModelService) { }

  ngOnInit(): void {
    // Fetch the data when the component initializes
    this.getDashboardData();
  }

  // Method to get the data from the service
  getDashboardData(): void {
    this.userService.getUsers().subscribe((count) => {
      this.customers = count.length;  // Store the brand count
    });

    this.modelService.getModels().subscribe((count) => {
      this.models = count.length;  // Store the models count
    });

    this.carService.getCars().subscribe((count) => {
      this.cars = count.length;  // Store the cars count
    });

    this.brandService.getBrands().subscribe((count) => {
      this.brands = count.length;  // Store the customers count
    });
  }
}
