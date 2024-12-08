import { Component } from '@angular/core';
import { RentalService } from '../../services/rental.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-rental',
  templateUrl: './list-rental.component.html',
  styleUrls: ['./list-rental.component.css']
})
export class ListRentalComponent {

  searchQuery: string = '';
  rentals: any[] = [];
  isLoading: boolean = true;
  errorMessage: string = '';

  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalItems: number = 0;
  paginatedRentals: any[] = [];

  constructor(
    private rentalService: RentalService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getRentals();
  }

  getRentals(): void {
    this.isLoading = true;
    this.rentalService.getrentals().subscribe(
      (data) => {
        this.isLoading = false;
        this.rentals = data;
        this.totalItems = this.rentals.length;
        this.filterRentals();
      },
      (error) => {
        this.isLoading = false;
        this.errorMessage = 'Failed to load rentals. Please try again later.';
        console.error('Error fetching rentals:', error);
        this.toastr.error('Error fetching rentals. Please try again.');
      }
    );
  }

  filterRentals(): void {
    let filteredRentals = this.rentals;
    if (this.searchQuery) {
      filteredRentals = this.rentals.filter(rental =>
        rental.carId.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        rental.userId.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }

    this.paginateRentals(filteredRentals);
  }

  paginateRentals(filteredRentals: any[]): void {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedRentals = filteredRentals.slice(start, end);
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages()) {
      this.currentPage = page;
      this.filterRentals();
    }
  }

  totalPages(): number {
    return Math.ceil(this.rentals.length / this.itemsPerPage);
  }

  viewRental(rentalId: number): void {
    this.router.navigate([`/admin/rental/${rentalId}`]);
  }

  deleteRental(rentalId: number): void {
    if (confirm('Are you sure you want to delete this rental?')) {
      this.rentalService.deleteRental(rentalId).subscribe(
        () => {
          this.toastr.success('Rental deleted successfully');
          this.getRentals();
        },
        (error) => {
          this.toastr.error('Error deleting rental. Please try again.');
          console.error('Error while deleting rental:', error);
        }
      );
    }
  }

  payRental(rentalId: number): void {
  }
}
