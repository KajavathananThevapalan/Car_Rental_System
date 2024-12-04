import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Reservation } from '../models/Reservation';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor(private http: HttpClient) { }

  getReservations() {
    return this.http.get<Reservation[]>('http://localhost:5282/api/Reservation');
  }

  createReservation(reservation: any) {
    return this.http.post('http://localhost:5282/api/Reservation', reservation);
  }

  deleteReservation(reservationId: number) {
    return this.http.delete('http://localhost:5282/api/Reservation/' + reservationId);
  }

  getReservation(reservationId: number) {
    return this.http.get<Reservation>('http://localhost:5282/api/Reservation/' + reservationId);
  }

  updateReservation(reservation: any) {
    return this.http.put('http://localhost:5282/api/Reservation/' + reservation.reservationId, reservation);
  }

  updateReservationStatus(reservationId: number, status: string) {
    const url = `http://localhost:5282/api/Reservation/${reservationId}/status`;
    const body = { status };
    return this.http.put(url, body);
  }

}
