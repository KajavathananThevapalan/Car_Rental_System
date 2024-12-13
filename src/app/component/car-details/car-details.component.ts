import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CarDetails } from '../../models/CarDetails';
import { CarService } from '../../services/car.service';
import { ToastrService } from 'ngx-toastr';
import { ReviewService } from '../../services/review.service';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.css']
})
export class CarDetailsComponent implements OnInit {
  totalItems: number = 0;
  carId!: number;
  reviews: any[] = [];
  userId: number = Number(localStorage.getItem('UserId'));
  carDetails!: CarDetails;
  largeImage: string = '';
  carImages: string[] = [];
  isSidePanelOpen = false;
  newReview: any = { user: '', comments: '', rating: 0 };  // Initialize rating to 0
  isLoggedIn: boolean = false; // Added to check login status

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private carService: CarService,
    private reviewService: ReviewService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    // Check if the user is logged in
    this.isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

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
    if (!this.isLoggedIn) {
      this.toastr.warning('You need to be logged in to submit a review');
      this.router.navigate(['/login']); // Redirect to login page if not logged in
      return;
    }

    if (this.newReview.user && this.newReview.comments && this.newReview.rating) {
      const newReview: any = {
        userId: this.userId,
        carId: this.carId,
        comments: this.newReview.comments,
        rating: this.newReview.rating
      };

      if (!this.carDetails.reviews) {
        this.carDetails.reviews = [];
      }
      this.carDetails.reviews.push(newReview);

      this.reviewService.submitReview(this.carId, newReview).subscribe(
        response => {
          this.toastr.success('Review submitted successfully!');
          this.newReview = { user: '', comments: '', rating: 0 };  // Reset review form
          this.getCarDetails(this.carId);  // Refresh car details to show new review
        },
        error => {
          this.toastr.error('Failed to submit the review');
        }
      );
    } else {
      this.toastr.warning('Please fill in all fields including the rating');
    }
  }

  getReviews(): void {
    this.reviewService.getReviews().subscribe(
      (data) => {
        this.reviews = data;
        this.totalItems = this.reviews.length;
      },
      (error) => {
        console.error('Error fetching reservations:', error);
        this.toastr.error('Error fetching reservations. Please try again.');
      }
    );
  }
}
