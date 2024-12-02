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
        localStorage.setItem('authToken', response);
        localStorage.setItem('isLoggedIn', 'true');

        const decoded: any = jwtDecode(response);
        // console.log(decoded.UserRole);

        if (decoded.UserRole === 'admin') {
          this.router.navigate(['/admin/dashboard']);
        } else {
          this.router.navigate(['']);
        }
      },
      error => {
        this.toastr.error("Invalid Email or Password");
      }
    );
  }

}