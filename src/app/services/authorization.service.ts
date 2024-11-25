import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  constructor(private http: HttpClient) { }

  isLoggedIn() {
    if (localStorage.getItem("token")) {
      const token = localStorage.getItem("token");
      // if(token){
      //   const decoded = jwtDecode(token);
      // }
      return true;
    } else {
      return false;
    }
  }

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

function jwtDecode(token: string) {
  throw new Error('Function not implemented.');
}

