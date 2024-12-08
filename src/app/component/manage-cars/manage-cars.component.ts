import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { CarDetails } from "../../models/CarDetails";
import { CarService } from "../../services/car.service";

@Component({
  selector: 'app-manage-cars',
  templateUrl: './manage-cars.component.html',
  styleUrls: ['./manage-cars.component.css']
})
export class ManageCarsComponent implements OnInit {

  isLoading: boolean = true;
  errorMessage: string = '';
  searchQuery: string = '';
  cars: CarDetails[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalItems: number = 0;
  paginatedCars: CarDetails[] = [];

  constructor(private carService: CarService, private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {
    this.getCars();
  }

  getCars(): void {
    this.isLoading = true;
    this.carService.getCars().subscribe(
      (data) => {
        this.isLoading = false;
        this.cars = data;
        this.totalItems = this.cars.length;
        this.filterCars();
      },
      (error) => {
        this.isLoading = false;
        this.errorMessage = 'Failed to load cars. Please try again later.';
        console.error('Error fetching cars:', error);
        this.toastr.error('Error fetching cars. Please try again.');
      }
    );
  }

  filterCars(): void {
    let filteredCars = this.cars;

    if (this.searchQuery) {
      filteredCars = this.cars.filter(car =>
        car.registrationNumber.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        car.licensePlate.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }

    this.paginateCars(filteredCars);
  }

  paginateCars(filteredCars: CarDetails[]): void {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedCars = filteredCars.slice(start, end);
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages()) {
      this.currentPage = page;
      this.filterCars();
    }
  }

  totalPages(): number {
    return Math.ceil(this.cars.length / this.itemsPerPage);
  }

  onDelete(carId: number) {
    if (confirm("Do you want to delete this Car?")) {
      this.carService.deleteCar(carId).subscribe((data: any) => {
        this.toastr.success("Car deleted successfully");
        this.getCars();
      });
    }
  }

  onEdit(carId: number) {
    this.router.navigate(['admin/car-edit/', carId]);
  }
}
