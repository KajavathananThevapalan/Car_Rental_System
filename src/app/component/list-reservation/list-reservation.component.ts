import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ReservationService } from '../../services/reservation.service';

@Component({
  selector: 'app-list-reservation',
  templateUrl: './list-reservation.component.html',
  styleUrl: './list-reservation.component.css'
})
export class ListReservationComponent {

  searchQuery: string = '';
  reservations: any[] = [];
  isLoading: boolean = true;
  errorMessage: string = '';

  constructor(
    private reservationService: ReservationService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getReservations();
  }

  getReservations(): void {
    this.isLoading = true;
    this.reservationService.getReservations().subscribe(
      (data) => {
        this.isLoading = false;
        this.reservations = data;
        console.log('reservations fetched:', this.reservations);
      },
      (error) => {
        this.isLoading = false;
        this.errorMessage = 'Failed to load reservations. Please try again later.';
        console.error('Error fetching reservations:', error);
        this.toastr.error('Error fetching reservations. Please try again.');
      }
    );
  }

  AcceptReservation(reservationId: number): void {
    if (confirm('Are you sure you want to accept this reservation?')) {
      this.reservationService.updateReservationStatus(reservationId, 'Accepted').subscribe(
        () => {
          this.toastr.info('reservation Accepted');
          this.getReservations();
        },
        (error) => {
          this.toastr.error('Error accept reservation. Please try again.');
          console.error('Error while accepting reservation:', error);
        }
      );
    }
  }

  DeclineReservation(reservationId: number): void {
    if (confirm('Are you sure you want to decline this reservation?')) {
      this.reservationService.updateReservationStatus(reservationId, 'Declined').subscribe(
        () => {
          this.toastr.info('reservation declined');
          this.getReservations();
        },
        (error) => {
          this.toastr.error('Error decline reservation. Please try again.');
          console.error('Error while declining reservation:', error);
        }
      );
    }
  }

  filteRedreservations() {
    if (!this.searchQuery) {
      return this.reservations;
    }

    return this.reservations.filter(reservation =>
      reservation.firstName.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      reservation.nic.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }
}
