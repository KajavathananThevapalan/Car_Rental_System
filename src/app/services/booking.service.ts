import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Booking } from '../models/Booking';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private http : HttpClient) { }

  getBookings() {
    return this.http.get<Booking[]>('http://localhost:5282/api/Reservation');
  }

  createBooking(booking: any) {
    return this.http.post('http://localhost:5282/api/Reservation', booking);
  }

  deleteBooking(bookingId: number) {
    return this.http.delete('http://localhost:5282/api/Reservation/' + bookingId);
  }

  getBooking(bookingId: number) {
    return this.http.get<Booking>('http://localhost:5282/api/Reservation/' + bookingId);
  }

  updateBooking(booking: any) {
    return this.http.put('http://localhost:5282/api/Reservation/' + booking.bookingId, booking);
  }
}
