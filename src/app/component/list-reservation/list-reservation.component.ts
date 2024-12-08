import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ReservationService } from '../../services/reservation.service';

@Component({
  selector: 'app-list-reservation',
  templateUrl: './list-reservation.component.html',
  styleUrls: ['./list-reservation.component.css']
})
export class ListReservationComponent {

  searchQuery: string = '';
  reservations: any[] = [];
  isLoading: boolean = true;
  errorMessage: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalItems: number = 0;
  paginatedReservations: any[] = [];

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
        this.totalItems = this.reservations.length;
        this.filterReservations();
      },
      (error) => {
        this.isLoading = false;
        this.errorMessage = 'Failed to load reservations. Please try again later.';
        console.error('Error fetching reservations:', error);
        this.toastr.error('Error fetching reservations. Please try again.');
      }
    );
  }

  filterReservations(): void {
    let filteredReservations = this.reservations;
    if (this.searchQuery) {
      filteredReservations = this.reservations.filter(reservation =>
        reservation.firstName.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        reservation.nic.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }

    this.paginateReservations(filteredReservations);
  }

  paginateReservations(filteredReservations: any[]): void {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedReservations = filteredReservations.slice(start, end);
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages()) {
      this.currentPage = page;
      this.filterReservations();
    }
  }

  totalPages(): number {
    return Math.ceil(this.reservations.length / this.itemsPerPage);
  }

  AcceptReservation(reservationId: number): void {
    if (confirm('Are you sure you want to accept this reservation?')) {
      this.reservationService.updateReservationStatus(reservationId, 'Accepted').subscribe(
        () => {
          this.toastr.info('Reservation Accepted');
          this.getReservations();
        },
        (error) => {
          this.toastr.error('Error accepting reservation. Please try again.');
          console.error('Error while accepting reservation:', error);
        }
      );
    }
  }

  DeclineReservation(reservationId: number): void {
    if (confirm('Are you sure you want to decline this reservation?')) {
      this.reservationService.updateReservationStatus(reservationId, 'Declined').subscribe(
        () => {
          this.toastr.info('Reservation declined');
          this.getReservations();
        },
        (error) => {
          this.toastr.error('Error declining reservation. Please try again.');
          console.error('Error while declining reservation:', error);
        }
      );
    }
  }
}
