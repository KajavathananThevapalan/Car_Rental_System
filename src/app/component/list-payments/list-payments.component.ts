import { Component } from '@angular/core';
import { PaymentService } from '../../services/payment.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router'; // Import the Router

@Component({
  selector: 'app-list-payments',
  templateUrl: './list-payments.component.html',
  styleUrl: './list-payments.component.css'
})
export class ListPaymentsComponent {

  searchQuery: string = '';
  payments: any[] = [];
  isLoading: boolean = true;
  errorMessage: string = '';

  constructor(
    private paymentService: PaymentService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getpayment();
  }

  getpayment(): void {
    this.isLoading = true;
    this.paymentService.getPayments().subscribe(
      (data) => {
        this.isLoading = false;
        this.payments = data;
        console.log('payment fetched:', this.payments);
      },
      (error) => {
        this.isLoading = false;
        this.errorMessage = 'Failed to load payment. Please try again later.';
        console.error('Error fetching payment:', error);
        this.toastr.error('Error fetching payment. Please try again.');
      }
    );
  }

  editPayment(paymentId: number): void {
    this.router.navigate(['/edit-payment', paymentId]);
  }

  PayNow(paymentId: number): void {
    this.paymentService.createPayment(paymentId).subscribe(
      (response) => {
        this.toastr.success('Payment processed successfully!');
        this.getpayment();
      },
      (error) => {
        this.toastr.error('Payment failed. Please try again.');
        console.error('Error processing payment:', error);
      }
    );
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
}
