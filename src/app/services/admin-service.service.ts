import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CarDetails } from '../models/CarDetails';

@Injectable({
  providedIn: 'root'
})

export class AdminServiceService {

  constructor(private http : HttpClient)
  { }

  getBrands() {
    return this.http.get<Brand[]>('http://localhost:5282/api/Brand');
  }

  createBrand(brand: any) {
    return this.http.post('http://localhost:5282/api/Brand', brand);
  }

  deleteBrand(brandId: number) {
    return this.http.delete('http://localhost:5282/api/Brand/' + brandId);
  }

  getBrand(brandId: number) {
    return this.http.get<Brand>('http://localhost:5282/api/Brand/' + brandId);
  }

  updateBrand(brand: any) {
    return this.http.put('http://localhost:5282/api/Brand/' + brand.brandId, brand);
  }

  getModels() {
    return this.http.get<Model[]>('http://localhost:5282/api/Model');
  }

  createModel(model: any) {
    return this.http.post('http://localhost:5282/api/Model', model);
  }

  deleteModel(modelId: number) {
    return this.http.delete('http://localhost:5282/api/Model/' + modelId);
  }

  getModel(modelId: number) {
    return this.http.get<Model>('http://localhost:5282/api/Model/' + modelId);
  }

  updateModel(model: any) {
    return this.http.put('http://localhost:5282/api/Model/' + model.modelId, model);
  }

  getCars() {
    return this.http.get<Car[]>('http://localhost:5282/api/Cars');
  }

  createCar(car: any) {
    return this.http.post('http://localhost:5282/api/Cars', car);
  }

  deleteCar(carId: number) {
    return this.http.delete('http://localhost:5282/api/Cars/' + carId);
  }

  getCar(carId: number) {
    return this.http.get<CarDetails>('http://localhost:5282/api/Cars/' + carId);
  }

  updateCar(car: any) {
    return this.http.put('http://localhost:5282/api/Cars/' + car.carId, car);
  }

}

export interface Brand{
  brandId:number;
  name:string;
  country:string;
  foundedYear: string;
  logoUrl: string,
  website: string,
  description: string
}

export interface Model {
  brands: any;
  modelId: number; // Optional for creation, mandatory for update
  brandId:Brand;
  name: string;
  year: number;
  engineType: EngineType;
  fuelType: FuelType;
  transmissionType: TransmissionType;
  mileage: number;
  horsepower: number;
  doors: number;
  seats: number;
  fuelEfficiency: number;
  category: string;
  updatedAt: Date;
}

export enum EngineType {
  Petrol = 'Petrol',
  Diesel = 'Diesel',
  Electric = 'Electric',
  Hybrid = 'Hybrid',
}

export enum FuelType {
  Gasoline = 'Gasoline',
  Electric = 'Electric',
  Hybrid = 'Hybrid',
  Diesel = 'Diesel',
}

export enum TransmissionType {
  Manual = 'Manual',
  Automatic = 'Automatic',
}

export interface Car{
  carId: number,
  model: Model,
  licensePlate: string,
  color: string,
  status: Status,
  pricePerDay: number,
  currentMileage: number,
  registrationNumber: string,
  yearOfManufacture: number,
  viewCount: number,
  carImages:CarImages 
}

export interface CarImages{
  imageUrl:string,
  imageType:string
}

export enum Status
{
    Available = 'Available',
    Reserved = 'Reserved',
    Rented ='Rented',
    UnderMaintenance = 'UnderMaintenance'
}

