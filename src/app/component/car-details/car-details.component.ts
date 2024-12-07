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
  isLoggedIn: boolean = false;
  showBookNow: boolean = false;
  showRentNow: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private carService: CarService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.carId = +params['carId'];  // Get carId from the URL
      this.getCarDetails(this.carId);
    });
  }

  // Fetch car details using the CarService
  getCarDetails(carId: number): void {
    this.carService.getCar(carId).subscribe(
      (data: CarDetails) => {
        this.carDetails = data;
        localStorage.setItem('carId', data.carId.toString())
        console.log(data.carId);

      },
      (error: any) => {
        console.error('Error fetching car details', error);
      }
    );
  }

  bookNow(carId: number): void {
    this.showBookNow = true;
    this.showRentNow = false;

    if (localStorage.getItem('isLoggedIn') === 'true') {
      this.router.navigate([`/car-details/${carId}/book-now`]);
    } else {
      alert('Please log in to book the car.');
      localStorage.setItem('redirectUrl', `/car-details/${carId}/book-now`);
      this.router.navigate(['/login']);
    }
  }

  rentNow(carId: number): void {
    this.showRentNow = true;
    this.showBookNow = false;
    
    if (localStorage.getItem('isLoggedIn') === 'true') {
      this.router.navigate([`/car-details/${carId}/rent-now`]);
    } else {
      alert('Please log in to rent the car.');
      localStorage.setItem('redirectUrl', `/car-details/${carId}/book-now`);
      this.router.navigate(['/login']);
    }
  }
}
