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
        
        localStorage.setItem("name", decoded.FirstName)
        localStorage.setItem("Role", decoded.UserRole)
        localStorage.setItem("UserId", decoded.Id)
      }
      return true;
    }else{
      return false;
    }
  }
}