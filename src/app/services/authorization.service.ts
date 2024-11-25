import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { jwtDecode } from "jwt-decode";


@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  constructor(private http: HttpClient) { }

  // Method to authenticate user
  login(email: string, password: string): Observable<any> {
    const user = { email, password };

    return this.http.post<any>("http://localhost:5282/api/Users/authenticate", user);
  }

  registerUser(user: any) {
    return this.http.post('http://localhost:5282/api/Users/Register', user, { responseType: 'text' });
  }

  logInUser(user: any): Observable<any> {
    return this.http.post("http://localhost:5282/api/Users/authenticate", user, {
      headers: { 'Content-Type': 'application/json' },
      responseType: "text"
    });
  }

  isLoggedIn(){
    if (localStorage.getItem("authToken")) {
      const token = localStorage.getItem("authToken");
      if (token) {
        const decoded:any = jwtDecode(token);
        console.log(decoded);
        
        localStorage.setItem("name", decoded.FullName)
        localStorage.setItem("Role", decoded.Roles)
      }
      return true;
    }else{
      return false;
    }
  }
}

export interface IUserRegister {
  firstName: string;
  lastName: string;
  nic: string;
  drivingLicenceNo: string;
  email: string;
  password: string;
  phone: string;
  role: 'Customer' | 'Admin'; // Consistent capitalization
  address: Address;
  images: UserImages[]; // Multiple images as array, as you have a FormArray for images
}

export interface Address {
  addressLine1: string;
  addressLine2: string;
  city: string;
  district: string;
  country: string;
}

export interface UserImages {
  imageUrl: string;
  imageType: string; // Consistent naming with your form field
}