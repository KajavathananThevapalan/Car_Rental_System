import { Component, Input, OnInit } from '@angular/core';
import { CarDetails } from '../../models/CarDetails';
import { BookingService } from '../../services/booking.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-book-now',
  templateUrl: './book-now.component.html',
  styleUrls: ['./book-now.component.css']
})
export class BookNowComponent implements OnInit {
  @Input() carDetails: CarDetails | undefined;

  bookingId: number | undefined;
  userId!: number;
  carId!: number;
  isEditMode = false;
  addBookingForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private bookingService: BookingService,
    private router: Router,
    private toastr: ToastrService,
  ) {
    this.addBookingForm = this.fb.group({
      carId: ['', [Validators.required]],
      userId: ['', [Validators.required]],
      pickupDate: ['', [Validators.required]],
      dropoffDate: ['', [Validators.required]],
      status: ['pending']
    });
  }

  ngOnInit(): void {
    this.carId = Number(localStorage.getItem('carId'));
    console.log('Fetched carId from localStorage:', this.carId);

    this.loadUserData();
  }

  loadUserData(): void {
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      try {
        const decodedToken: any = jwtDecode(authToken);
        const userId = decodedToken?.Id;
        this.userId = userId;
        console.log('Decoded userId:', this.userId);

        this.addBookingForm.patchValue({
          carId: this.carId,
          userId: this.userId 
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
    const booking = this.addBookingForm.value;
    console.log('Form data being sent:', booking);

    this.bookingService.createBooking(booking).subscribe(
      (data) => {
        console.log('Create response:', data);
        this.toastr.success('Booking added successfully');
        this.router.navigate(['']);
      },
      (error) => {
        console.error('Error while creating booking:', error);
        this.toastr.error('Error adding booking. Please try again.');
      }
    );

  }

  onClose(): void {
    this.router.navigate(['']);
  }
}
