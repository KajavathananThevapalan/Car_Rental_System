import { Component, Input, OnInit } from '@angular/core';
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
  @Input() carDetails: CarDetails | undefined;

  rentalId: number | undefined;
  userId!: number;
  carId!: number;
  isEditMode = false;
  addRentalForm: FormGroup;
  amount!: number;
  totalAmount!: number;

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
      rentalStatus: ['pending'],
      totalAmount: [0],
    });
  }

  ngOnInit(): void {
    this.carId = Number(localStorage.getItem('carId'));
    console.log('Fetched carId from localStorage:', this.carId);

    this.loadUserData();
    this.calculateAmount(this.carId);
  }

  // Fetch car price and set the pricePerDay
  calculateAmount(carId: number) {
    this.carService.getCar(carId).subscribe((data) => {
      this.amount = data.pricePerDay;
      console.log('Car price per day:', this.amount);
    });
  }

  // Calculate total amount based on pickup and dropoff dates
  calculateTotalAmount() {
    const pickupDate = this.addRentalForm.get('pickupDate')?.value;
    const dropoffDate = this.addRentalForm.get('dropoffDate')?.value;

    if (pickupDate && dropoffDate) {
      const start = new Date(pickupDate);
      const end = new Date(dropoffDate);

      const timeDifference = end.getTime() - start.getTime();

      // Calculate the difference in days
      const daysDifference = timeDifference / (1000 * 3600 * 24);

      if (daysDifference < 0) {
        this.toastr.error('Dropoff date cannot be earlier than pickup date.');
        this.addRentalForm.get('totalAmount')?.setValue(0); // Reset totalAmount to 0
      } else {
        // Calculate the total amount
        const totalAmount = daysDifference * this.amount;
        this.addRentalForm.get('totalAmount')?.setValue(totalAmount); // Update the form control with calculated amount
        this.totalAmount = totalAmount; // Update the component's totalAmount variable
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
        console.log('Decoded userId:', this.userId);

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

  onSubmit(): void {
    const rental = this.addRentalForm.value;
    console.log('Form data being sent:', rental);

    this.rentalService.createRental(rental).subscribe(
      (data) => {
        console.log('Create response:', data);
        this.toastr.success('Rental added successfully');
        this.router.navigate(['']);
      },
      (error) => {
        console.error('Error while creating rental:', error);
        this.toastr.error('Error adding rental. Please try again.');
      }
    );
  }

  onClose(): void {
    this.router.navigate(['']);
  }
}
