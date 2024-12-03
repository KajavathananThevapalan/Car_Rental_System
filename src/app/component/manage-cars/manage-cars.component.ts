import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { CarDetails } from "../../models/CarDetails";
import { CarService } from "../../services/car.service";

@Component({
  selector: 'app-manage-cars',
  templateUrl: './manage-cars.component.html',
  styleUrl: './manage-cars.component.css'
})
export class ManageCarsComponent {

  constructor(private carService: CarService, private toastr: ToastrService, private router: Router) { }

  isLoading: boolean = true;
  errorMessage: string = '';
  searchQuery: string = '';
  cars: CarDetails[] = [];

  ngOnInit(): void {
    this.getCars();
  }

  onDelete(carId: number) {
    if (confirm("Do you want to delete this Car?")) {
      this.carService.deleteCar(carId).subscribe((data: any) => {
        this.toastr.success("success");
        this.getCars();
      })
    }
  }

  onEdit(carId: number) {
    this.router.navigate(['admin/car-edit/', carId])
  }

  getCars(): void {
    this.isLoading = true;
    this.carService.getCars().subscribe(
      (data) => {
        this.isLoading = false;
        this.cars = data;
      },
      (error) => {
        this.isLoading = false;
        this.errorMessage = 'Failed to load cars. Please try again later.';
        console.error('Error fetching cars:', error);
        this.toastr.error('Error fetching cars. Please try again.');
      }
    );
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