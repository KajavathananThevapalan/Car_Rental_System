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

  cars: any[] = [];
  isLoading: boolean = true;
  errorMessage: string = '';

  constructor(
    private adminService: AdminServiceService,
    private toastr: ToastrService,
    private router: Router) { }

  ngOnInit(): void {
    this.getCars();
  }

  getCars(): void {
    this.isLoading = true;
    this.adminService.getCars().subscribe(
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
