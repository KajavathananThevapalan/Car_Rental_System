import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Rental } from '../models/Rental';


@Injectable({
  providedIn: 'root'
})
export class RentalService {

  constructor(private http : HttpClient) { }

  getrentals() {
    return this.http.get<Rental[]>('http://localhost:5282/api/Rentals');
  }

  createRental(rental: any) {
    return this.http.post('http://localhost:5282/api/Rentals', rental);
  }

  deleteRental(rentalId: number) {
    return this.http.delete('http://localhost:5282/api/Rentals/' + rentalId);
  }

  getRental(rentalId: number) {
    return this.http.get<Rental>('http://localhost:5282/api/Rentals/' + rentalId);
  }

  getRentalsByUser(rentalId: number) {
    return this.http.get<Rental>('http://localhost:5282/api/Rentals/user/' + rentalId);
  }

  updateRental(rental: any) {
    return this.http.put('http://localhost:5282/api/Rentals/' + rental.rentalId, rental);
  }

  updateRentalStatus(rentalId: number, rentalStatus: string) {
    const url = `http://localhost:5282/api/Rentals/${rentalId}/status`;
    const body = { rentalStatus };
    return this.http.put(url, body);
  }
}
