import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CarDetails } from '../models/CarDetails';

@Injectable({
  providedIn: 'root'
})

export class AdminServiceService {

  

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
  modelId: number,
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

