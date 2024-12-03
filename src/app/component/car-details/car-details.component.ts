import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminServiceService } from '../../services/admin-service.service';
import { CarDetails } from '../../models/CarDetails';
import { CarService } from '../../services/car.service';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.css']
})
export class CarDetailsComponent implements OnInit {
  carId!: number;
  carDetails!: CarDetails;

  constructor(
    private route: ActivatedRoute,
    private carService: CarService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.carId = +params['id'];  // Get carId from the URL
      this.getCarDetails(this.carId);
    });
  }

  // Fetch car details using the CarService
  getCarDetails(carId: number): void {
    this.carService.getCar(carId).subscribe(
      (data: CarDetails) => {
        this.carDetails = data;
        console.log(data);
        
      },
      (error: any) => {
        console.error('Error fetching car details', error);
      }
    );
  }

  // Define what happens when the user clicks "Book Now"
  bookNow(): void {
    this.router.navigate(['/booking', this.carDetails.carId]); // Navigate to a booking page
  }

  // Define what happens when the user clicks "Rent Now"
  rentNow(): void {
    this.router.navigate(['/rent', this.carDetails.carId]); // Navigate to a booking page
  }

  
}
