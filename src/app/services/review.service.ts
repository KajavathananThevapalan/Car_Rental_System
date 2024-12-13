import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Review } from '../models/Review';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(private http: HttpClient) { }

  submitReview(carId: number, review: any): Observable<any> {
    return this.http.post('http://localhost:5282/api/Review', review);
  }

  getReviews() {
    return this.http.get<Review[]>('http://localhost:5282/api/Review');
  }
}
