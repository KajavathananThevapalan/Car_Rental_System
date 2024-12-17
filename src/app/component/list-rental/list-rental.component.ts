import { Component } from '@angular/core';
import { RentalService } from '../../services/rental.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NotificationService } from '../../services/notification.service'; // Add this import
import { UserService } from '../../services/user.service';
import { Rental } from '../../models/Rental';
import { User } from '../../models/User';

@Component({
  selector: 'app-list-rental',
  templateUrl: './list-rental.component.html',
  styleUrls: ['./list-rental.component.css']
})
export class ListRentalComponent {

  searchQuery: string = '';
  rentals: Rental[] = [];
  isLoading: boolean = true;
  errorMessage: string = '';

  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalItems: number = 0;
  paginatedRentals: any[] = [];
  user!: User;

  constructor(
    private rentalService: RentalService,
    private userService: UserService,
    private toastr: ToastrService,
    private router: Router,
    private notificationService: NotificationService
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

        this.rentals.sort((a, b) => {
          const dateA = new Date(a.createdAt).getTime();
          const dateB = new Date(b.createdAt).getTime();
          return dateB - dateA;
        });

        // console.log(this.rentals[0].userId);
        this.userService.getUserById(this.rentals[0].userId).subscribe(
          (data) => {
            this.user = data;
            // console.log(this.user);

          },
          (error) => {
            this.toastr.error('Error fetching user details');
            this.isLoading = false;
          }
        );

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
      // filteredRentals = this.rentals.filter(rental =>
      //   rental.carId.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      //   rental.userId.toLowerCase().includes(this.searchQuery.toLowerCase())
      // );
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
          this.sendNotification(rentalId, 'deleted');
        },
        (error) => {
          this.toastr.error('Error deleting rental. Please try again.');
          console.error('Error while deleting rental:', error);
        }
      );
    }
  }

  acceptRental(rentalId: number): void {
    if (confirm('Are you sure you want to accept this rental?')) {
      this.rentalService.updateRentalStatus(rentalId, 'Booked').subscribe(
        () => {
          this.toastr.info('Booking successfully');
          this.getRentals();
          this.sendNotification(rentalId, 'accepted');
        },
        (error) => {
          this.toastr.error('Error accepting rental. Please try again.');
          console.error('Error while accepting rental:', error);
        }
      );
    }
  }

  declineRental(rentalId: number): void {
    if (confirm('Are you sure you want to decline this rental?')) {
      this.rentalService.updateRentalStatus(rentalId, 'Declined').subscribe(
        () => {
          this.toastr.info('Booking declined');
          this.getRentals();
          this.sendNotification(rentalId, 'declined');
        },
        (error) => {
          this.toastr.error('Error declining rental. Please try again.');
          console.error('Error while declining rental:', error);
        }
      );
    }
  }

  payRental(rentalId: number): void {
    if (confirm('Are you sure you want to Pay this rental?')) {
      this.router.navigate(['/admin/payment', rentalId]);
      this.rentalService.updateRentalStatus(rentalId, 'Rented').subscribe(
        () => {
          // this.toastr.info('Rented successfully');
          this.getRentals();
          this.sendNotification(rentalId, 'paid');
        },
        (error) => {
          this.toastr.error('Error Pay rental. Please try again.');
          console.error('Error while Paying rental:', error);
        }
      );
    }
  }

  returnRental(rentalId: number): void {
    if (confirm('Are you sure you want to return this rental?')) {
      this.rentalService.updateRentalStatus(rentalId, 'Available').subscribe(
        () => {
          this.toastr.success('Returned Successfully');
          this.getRentals();
          this.sendNotification(rentalId, 'returned');
        },
        (error) => {
          this.toastr.error('Error returning car. Please try again.');
          console.error('Error while returning rental:', error);
        }
      );
    }
  }

  // Send notification to the user after each action
  sendNotification(rentalId: number, action: string): void {
    const rental = this.rentals.find(r => r.rentalId === rentalId);
    if (rental) {
      const notification = {
        email: this.user.email,
        message: `Your rental has been ${action}.`,
        type: 'Rental Update',
        userId: rental.userId
      };

      this.notificationService.sendNotification(notification).subscribe(
        () => {
          console.log(`Notification sent for rental ${action}`);
        },
        (error) => {
          console.error('Error sending notification:', error);
        }
      );
    }
  }
}
