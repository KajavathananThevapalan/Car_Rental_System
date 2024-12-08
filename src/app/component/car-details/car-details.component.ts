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
  largeImage: string = '';
  showRentNow: boolean = false;
  carImages: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private carService: CarService,
    private router: Router
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

  bookNow(carId: number): void {
    this.showRentNow = true;
    this.router.navigate([`/car-details/${carId}/rent-now`]);
  }
}
