import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthorizationService } from '../../services/authorization.service';
import { ToastrService } from 'ngx-toastr';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm !: FormGroup;
  logInData: any;

  constructor(private fb: FormBuilder, private authService: AuthorizationService, private toastr: ToastrService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    })
  }

  onLogIn() {
    this.authService.logInUser(this.loginForm.value).subscribe(
      response => {
        // Save the token in localStorage
        localStorage.setItem('authToken', response);

        // Set the login state to true after successful login
          localStorage.setItem('isLoggedIn', 'true');
  
        // Decode the JWT to get the user role
        const decoded: any = jwtDecode(response);
        // console.log(decoded.UserRole);
  
        // Check if the user is an admin and navigate accordingly
        if (decoded.UserRole === 'admin') {
          this.router.navigate(['/admin']);  // Navigate to admin page
        } else {
          this.router.navigate(['']);  // Navigate to the homepage or dashboard
        }
      },
      error => {
        this.toastr.error("Invalid Email or Password");
      }
    );
  }
  
}