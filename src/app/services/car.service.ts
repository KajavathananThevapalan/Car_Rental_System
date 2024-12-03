import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CarDetails } from '../models/CarDetails';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  constructor(private http : HttpClient)
  { }

  getCars() {
    return this.http.get<CarDetails[]>('http://localhost:5282/api/Cars');
  }

  createCar(car: CarDetails) {
    return this.http.post('http://localhost:5282/api/Cars', car);
  }

  deleteCar(carId: number) {
    return this.http.delete('http://localhost:5282/api/Cars/' + carId);
  }

  getCar(carId: number) {
    return this.http.get<CarDetails>('http://localhost:5282/api/Cars/' + carId);
  }

  updateCar(car: CarDetails) {
    return this.http.put('http://localhost:5282/api/Cars/' + car.carId, car);
  }
}
