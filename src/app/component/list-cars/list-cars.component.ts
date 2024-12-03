import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarService } from '../../services/car.service';

@Component({
  selector: 'app-list-cars',
  templateUrl: './list-cars.component.html',
  styleUrl: './list-cars.component.css'
})
export class ListCarsComponent {

  cars: any[] = [];
  isLoading: boolean = true;
  errorMessage: string = '';

  constructor(
    private carService: CarService,
    private toastr: ToastrService,
    private router: Router) { }

  ngOnInit(): void {
    this.getCars();
  }

  getCars(): void {
    this.isLoading = true;
    this.carService.getCars().subscribe(
      (data) => {
        // console.log(data[0].carImages);
        
        this.isLoading = false;
        this.cars = data;
        // console.log('cars fetched:', this.cars);
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
    this.router.navigate(['/car-details', car.carId]);
  }
}
