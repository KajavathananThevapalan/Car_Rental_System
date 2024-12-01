import { Component } from '@angular/core';
import { AdminServiceService } from '../../services/admin-service.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-cars',
  templateUrl: './list-cars.component.html',
  styleUrl: './list-cars.component.css'
})
export class ListCarsComponent {

  cars: any[] = []; // Array to hold the cars
  isLoading: boolean = true; // Flag to show loading indicator
  errorMessage: string = '';

  constructor(
    private adminService: AdminServiceService,
    private toastr: ToastrService, // Inject Toastr for showing notifications
    private router: Router) { }

  ngOnInit(): void {
    this.getCars();
  }

  getCars(): void {
    this.isLoading = true; // Start loading
    this.adminService.getCars().subscribe(
      (data) => {
        console.log(data[0].carImages);
        
        this.isLoading = false; // Stop loading
        this.cars = data; // Assign the fetched data to cars
        // console.log('cars fetched:', this.cars);
      },
      (error) => {
        this.isLoading = false; // Stop loading
        this.errorMessage = 'Failed to load cars. Please try again later.';
        console.error('Error fetching cars:', error);
        this.toastr.error('Error fetching cars. Please try again.');
      }
    );
  }

  // Method to view car details
  viewCar(carId: number): void {
    // console.log('Navigating to car with ID:', carId);
    this.router.navigate([`/admin/car/${carId}`]); // Ensure the path is correct
  }
}
