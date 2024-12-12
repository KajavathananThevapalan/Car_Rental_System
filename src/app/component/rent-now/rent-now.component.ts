import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { CarDetails } from '../../models/CarDetails';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { ToastrService } from 'ngx-toastr';
import { CarService } from '../../services/car.service';
import { RentalService } from '../../services/rental.service';

@Component({
  selector: 'app-rent-now',
  templateUrl: './rent-now.component.html',
  styleUrls: ['./rent-now.component.css'],
})
export class RentNowComponent implements OnInit {
  @Input() carDetails!: CarDetails;
  @Output() closePanel = new EventEmitter<void>();
  
  rentalId: number | undefined;
  userId!: number;
  carId!: number;
  isEditMode = false;
  addRentalForm: FormGroup;
  amount!: number;
  totalAmount!: number;
  isBookCarOpen = true;

  constructor(
    private fb: FormBuilder,
    private rentalService: RentalService,
    private router: Router,
    private toastr: ToastrService,
    private carService: CarService
  ) {
    this.addRentalForm = this.fb.group({
      carId: ['', [Validators.required]],
      userId: ['', [Validators.required]],
      pickupDate: ['', [Validators.required]],
      dropoffDate: ['', [Validators.required]],
      rentalStatus: ['Pending'],
      totalAmount: [0],
    });
  }

  ngOnInit(): void {
    this.carId = this.carDetails?.carId;
    console.log('Car Details:', this.carDetails);
    this.loadUserData();
    this.calculateAmount(this.carId);
  }

  calculateAmount(carId: number) {
    this.carService.getCar(carId).subscribe((data) => {
      this.amount = data.pricePerDay;
      console.log('Car price per day:', this.amount);
    });
  }

  calculateTotalAmount() {
    const pickupDate = this.addRentalForm.get('pickupDate')?.value;
    const dropoffDate = this.addRentalForm.get('dropoffDate')?.value;

    if (pickupDate && dropoffDate) {
      const start = new Date(pickupDate);
      const end = new Date(dropoffDate);

      const timeDifference = end.getTime() - start.getTime();
      const daysDifference = timeDifference / (1000 * 3600 * 24);

      if (daysDifference < 0) {
        this.toastr.error('Dropoff date cannot be earlier than pickup date.');
        this.addRentalForm.get('totalAmount')?.setValue(0);
      } else {
        const totalAmount = daysDifference * this.amount;
        this.addRentalForm.get('totalAmount')?.setValue(totalAmount);
        this.totalAmount = totalAmount;
      }
    }
  }

  loadUserData(): void {
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      try {
        const decodedToken: any = jwtDecode(authToken);
        const userId = decodedToken?.Id;
        this.userId = userId;
        this.addRentalForm.patchValue({
          carId: this.carId,
          userId: this.userId,
        });
      } catch (error) {
        console.error('Error decoding token:', error);
        this.toastr.error('Failed to decode the token.');
      }
    } else {
      console.error('No auth token found');
      this.toastr.error('User not authenticated.');
    }
  }

  closeBookCar(): void {
    this.isBookCarOpen = false;
    this.closePanel.emit();
  }

  onSubmit(): void {
    const rental = this.addRentalForm.value;
    rental.pickupDate = new Date(rental.pickupDate).toISOString();
    rental.dropoffDate = new Date(rental.dropoffDate).toISOString();

    this.rentalService.createRental(rental).subscribe(
      (data) => {
        this.toastr.info('Your request was successful');
        this.router.navigate(['']);
      },
      (error) => {
        this.toastr.error('Error adding booking. Please try again.');
      }
    );
  }
}
