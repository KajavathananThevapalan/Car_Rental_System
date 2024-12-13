import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CarDetails } from '../../models/CarDetails';
import { CarService } from '../../services/car.service';
import { ToastrService } from 'ngx-toastr';

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
    private router: Router,
    private carService: CarService,
    private toastr: ToastrService
  ) { }

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
    if (localStorage.getItem('isLoggedIn') === 'true') {
      this.isSidePanelOpen = true;
    } else {
      this.toastr.info('Login for your Booking');
      this.router.navigate(['/login']);
      localStorage.setItem('redirectUrl', '/car-details/' + this.carId);
    }
  }  

  closeSidePanel(): void {
    this.isSidePanelOpen = false;
  }

  submitReview(): void {
    if (this.newReview.user && this.newReview.comment) {
      const newReview = {
        user: this.newReview.user,
        comment: this.newReview.comment
      };

      this.carDetails.reviews.push(newReview);

      this.newReview.user = '';
      this.newReview.comment = '';
    }
  }
}
