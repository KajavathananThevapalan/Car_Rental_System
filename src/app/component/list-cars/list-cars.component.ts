import { Component, Input, OnChanges, SimpleChanges } from "@angular/core";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { CarDetails } from "../../models/CarDetails";
import { CarService } from "../../services/car.service";

@Component({
  selector: 'app-list-cars',
  templateUrl: './list-cars.component.html',
  styleUrls: ['./list-cars.component.css']
})
export class ListCarsComponent implements OnChanges {
  @Input() searchQuery: string = '';
  
  cars: CarDetails[] = [];
  isLoading: boolean = true;
  errorMessage: string = '';
  filteredCars: CarDetails[] = [];
  paginatedCars: CarDetails[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 6;
  
  constructor(
    private carService: CarService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getCars();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['searchQuery']) {
      this.filterCars();
    }
  }

  getCars(): void {
    this.isLoading = true;
    this.carService.getCars().subscribe(
      (data) => {
        this.isLoading = false;
        this.cars = data;
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

  viewCarDetails(car: any): void {
    console.log(car.carId);
    this.router.navigate(['/car-details', car.carId]);
  }

  filterCars(): void {
    if (!this.searchQuery) {
      this.filteredCars = this.cars;
    } else {
      this.filteredCars = this.cars.filter(car =>
        car.color.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        car.pricePerDay.toString().includes(this.searchQuery)
      );
    }

    this.currentPage = 1;

    this.paginateCars();
  }

  paginateCars(): void {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedCars = this.filteredCars.slice(start, end);
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages()) {
      this.currentPage = page;
      this.paginateCars();
    }
  }

  totalPages(): number {
    return Math.ceil(this.filteredCars.length / this.itemsPerPage);
  }
}
