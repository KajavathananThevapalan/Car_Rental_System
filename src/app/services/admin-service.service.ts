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
    return this.http.put('http://localhost:5282/api/Brand/' + brand.id, brand);
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

export interface Model{
  
}
