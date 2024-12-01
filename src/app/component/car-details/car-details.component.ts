import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminServiceService } from '../../services/admin-service.service';
import { CarDetails } from '../../models/CarDetails';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.css']
})
export class CarDetailsComponent implements OnInit {
  carId!: number;
  carDetails: CarDetails | null = null;

  constructor(
    private route: ActivatedRoute,
    private carService: AdminServiceService
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
}
