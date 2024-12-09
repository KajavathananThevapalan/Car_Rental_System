import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RentalService } from '../../services/rental.service';
import { Rental } from '../../models/Rental';
import { ToastrService } from 'ngx-toastr';
import { PaymentService } from '../../services/payment.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  payment = {
    amount: 0,
    paymentMethod: 'Cash',
    paymentStatus: 'Completed',
    rentalId: 0
  };
  rentalId!: number;
  rental!: Rental;
  errorMessage: string = '';

  constructor(private route: ActivatedRoute, private rentalService: RentalService, private paymentService: PaymentService, private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.rentalId = +params['rentalId'];
      this.getRental(this.rentalId);
    });
  }

  getRental(rentalId: number): void {
    this.rentalService.getRental(rentalId).subscribe(
      (data) => {
        this.payment.amount = data.totalAmount;
        this.payment.rentalId = data.rentalId;
      },
      (error) => {
        this.errorMessage = 'Failed to load rental. Please try again later.';
        console.error('Error fetching rental:', error);
        this.toastr.error('Error fetching rental. Please try again.');
      }
    );
  }


  submitPayment() {
    this.paymentService.createPayment(this.payment).subscribe(
      (data) => {
        console.log('Create response:', data);
        this.toastr.success('Rented successful');
        this.router.navigate(['/admin/list-rentals']);
      },
      (error) => {
        console.error('Error while request payment:', error);
        this.toastr.error('Error adding payment. Please try again.');
      }
    )
  }
}
