import { Component } from '@angular/core';
import { RentalService } from '../../services/rental.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-rental',
  templateUrl: './list-rental.component.html',
  styleUrl: './list-rental.component.css'
})
export class ListRentalComponent {

  searchQuery: string = '';
  rentals: any[] = [];
  isLoading: boolean = true;
  errorMessage: string = '';

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
        console.log('rentals fetched:', this.rentals);
      },
      (error) => {
        this.isLoading = false;
        this.errorMessage = 'Failed to load rentals. Please try again later.';
        console.error('Error fetching rentals:', error);
        this.toastr.error('Error fetching rentals. Please try again.');
      }
    );
  }

  viewRental(rentalId: number): void {
    // console.log('Navigating to rental with ID:', rentalId);
    this.router.navigate([`/admin/rental/${rentalId}`]);
  }

  deleteRental(rentalId: number): void {
    if (confirm('Are you sure you want to delete this rental?')) {
      this.rentalService.deleteRental(rentalId).subscribe(
        () => {
          this.toastr.success('rental deleted successfully');
          this.getRentals();
        },
        (error) => {
          this.toastr.error('Error deleting rental. Please try again.');
          console.error('Error while deleting rental:', error);
        }
      );
    }
  }

  filteredRentals() {
    if (!this.searchQuery) {
      return this.rentals;
    }

    return this.rentals.filter(rental =>
      rental.firstName.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      rental.nic.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }
}
