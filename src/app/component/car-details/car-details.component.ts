import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { CarDetails } from "../../models/CarDetails";
import { CarService } from "../../services/car.service";

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.css']
})
export class CarDetailsComponent implements OnInit {
  carId!: number;
  carDetails!: CarDetails;
  largeImage: string = ''; // The large image
  showBookNow: boolean = false;
  showRentNow: boolean = false;

  // Hold the thumbnails and large image list
  carImages: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private carService: CarService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.carId = +params['carId'];  // Get carId from the URL
      this.getCarDetails(this.carId);
    });
  }

  getCarDetails(carId: number): void {
    this.carService.getCar(carId).subscribe(
      (data: CarDetails) => {
        this.carDetails = data;
        this.largeImage = data.frotView; // Default large image is the front view
        this.carImages = [data.backView, data.sideView, data.interior]; // Other images as thumbnails
      },
      (error: any) => {
        console.error('Error fetching car details', error);
      }
    );
  }

  changeImage(image: string): void {
    // Swap large image with the clicked thumbnail
    const previousLargeImage = this.largeImage;
    this.largeImage = image;

    // Add the previous large image to the thumbnails list (if it's not already there)
    if (!this.carImages.includes(previousLargeImage)) {
      this.carImages.push(previousLargeImage);
    }
  }

  bookNow(carId: number): void {
    this.showBookNow = true;
    this.showRentNow = false;
    this.router.navigate([`/car-details/${carId}/book-now`]);
  }

  rentNow(carId: number): void {
    this.showRentNow = true;
    this.showBookNow = false;
    this.router.navigate([`/car-details/${carId}/rent-now`]);
  }
}
