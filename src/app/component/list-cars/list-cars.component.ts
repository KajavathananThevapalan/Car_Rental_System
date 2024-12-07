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
        this.filteredCars = this.cars;
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

  filterCars() {
    if (!this.searchQuery) {
      this.filteredCars = this.cars;
    } else {
      this.filteredCars = this.cars.filter(car =>
        car.color.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        car.pricePerDay.toString().includes(this.searchQuery)
      );
    }
  }
}
