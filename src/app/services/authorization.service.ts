import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  constructor(private http : HttpClient) { }

  isLoggedIn(){
    if(localStorage.getItem("token")){
      const token = localStorage.getItem("token");
      // if(token){
      //   const decoded = jwtDecode(token);
      // }
      return true;
    }else{
      return false;
    }
  }

  registerUser(user: any) {
    return this.http.post('http://localhost:5282/api/Users/Register', user);
  }

  logInUser(user: any){
    return this.http.post("http://localhost:5282/api/Users/authenticate" , user,{responseType: "text"})
  }

}

export interface IUserRegister{
  firstName:string;
  lastName:string;
  nic:string;
  drivingLicenceNo:string;
  email:string;
  password:string;
  phone:string;
  role:'Customer' | 'Admin';
  address: Address;
}

export interface Address{
  addressLine1:string;
  addressLine2:string;
  city:string;
  district: string;
}
