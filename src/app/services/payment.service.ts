import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Payment } from '../models/Payment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http : HttpClient) { }

  getPayments() {
    return this.http.get<Payment[]>('http://localhost:5282/api/Payments');
  }

  createPayment(payment: any) {
    return this.http.post('http://localhost:5282/api/Payments', payment);
  }

  deletePayment(paymentId: number) {
    return this.http.delete('http://localhost:5282/api/Payments/' + paymentId);
  }

  getPayment(paymentId: number) {
    return this.http.get<Payment>('http://localhost:5282/api/Payments/' + paymentId);
  }

  updatePayment(payment: any) {
    return this.http.put('http://localhost:5282/api/Payments/' + payment.paymentId, payment);
  }
}
