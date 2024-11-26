import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

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
  updatedBy?: string; // Optional for update tracking
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

export interface User{
  
}

