import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  largeImage: string = '';
  carImages: string[] = [];
  isSidePanelOpen = false;
  newReview = { user: '', comment: '' };
  
  constructor(
    private route: ActivatedRoute,
    private carService: CarService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.carId = +params['carId'];
      this.getCarDetails(this.carId);
    });
  }

  getCarDetails(carId: number): void {
        this.carService.getCar(carId).subscribe(
          (data: CarDetails) => {
            this.carDetails = data;
            this.largeImage = data.frotView;
            this.carImages = [data.backView, data.sideView, data.interior];
          },
          (error: any) => {
            console.error('Error fetching car details', error);
          }
        );
      }

  changeImage(image: string): void {
    const previousLargeImage = this.largeImage;
    this.largeImage = image;

    if (!this.carImages.includes(previousLargeImage)) {
      this.carImages.push(previousLargeImage);
    }
  }

  openBookCarPanel(): void {
    this.isSidePanelOpen = true; // Open the side panel
  }

  closeSidePanel(): void {
    this.isSidePanelOpen = false; // Close the side panel
  }

  submitReview(): void {
    if (this.newReview.user && this.newReview.comment) {
      const newReview = { 
        user: this.newReview.user,
        comment: this.newReview.comment
      };

      // Add the new review to the car's reviews
      this.carDetails.reviews.push(newReview);

      // Reset the form fields
      this.newReview.user = '';
      this.newReview.comment = '';
    }
  }
}
