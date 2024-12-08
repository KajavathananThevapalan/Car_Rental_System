import { Component } from '@angular/core';
import { PaymentService } from '../../services/payment.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-payments',
  templateUrl: './list-payments.component.html',
  styleUrls: ['./list-payments.component.css']
})
export class ListPaymentsComponent {

  searchQuery: string = '';
  payments: any[] = [];
  isLoading: boolean = true;
  errorMessage: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalItems: number = 0;
  paginatedPayments: any[] = [];

  constructor(
    private paymentService: PaymentService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getPayments();
  }

  getPayments(): void {
    this.isLoading = true;
    this.paymentService.getPayments().subscribe(
      (data) => {
        this.isLoading = false;
        this.payments = data;
        this.totalItems = this.payments.length;
        this.filterPayments();
      },
      (error) => {
        this.isLoading = false;
        this.errorMessage = 'Failed to load payments. Please try again later.';
        console.error('Error fetching payments:', error);
        this.toastr.error('Error fetching payments. Please try again.');
      }
    );
  }

  paginatePayments(): void {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedPayments = this.filterPayments().slice(start, end);
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages()) {
      this.currentPage = page;
      this.paginatePayments();
    }
  }

  totalPages(): number {
    return Math.ceil(this.filterPayments().length / this.itemsPerPage);
  }

  filterPayments() {
    if (!this.searchQuery) {
      return this.payments;
    }

    return this.payments.filter(payment =>
      payment.firstName.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      payment.nic.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  editPayment(paymentId: number): void {
    this.router.navigate(['/edit-payment', paymentId]);
  }

  PayNow(paymentId: number): void {
    this.paymentService.createPayment(paymentId).subscribe(
      (response) => {
        this.toastr.success('Payment processed successfully!');
        this.getPayments();
      },
      (error) => {
        this.toastr.error('Payment failed. Please try again.');
        console.error('Error processing payment:', error);
      }
    );
  }
}
