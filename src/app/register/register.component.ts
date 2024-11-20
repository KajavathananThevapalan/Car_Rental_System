import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthorizationService, IUserRegister } from '../services/authorization.service';
import { ToastrService } from 'ngx-toastr';




@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent{
  isPasswordMatch: boolean = false;

  checkPassword(event: any) {
    console.log(event);
    if (this.password == event.target?.value) {
      this.isPasswordMatch = true;
    }
  }

  registerForm!: FormGroup;
  regUsers: IUserRegister[] = [];

  constructor(private fb: FormBuilder, private router: Router, private toastr: ToastrService, private authService: AuthorizationService) {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: [''],
      nic: ['', Validators.required], // NIC field
      drivingLicenceNo: ['', Validators.required], // Driving Licence No. field
      email: ['', [Validators.required, Validators.email]], // Email field
      password: ['', [Validators.required, Validators.minLength(6)]], // Password field
      phone: ['', [Validators.required, Validators.pattern(/^\+?[1-9]\d{1,14}$/)]], // Phone validation
      role: ['Customer', Validators.required], // Default to Customer, may allow switching to Admin
      address: this.fb.group({
        addressLine1: ['', Validators.required],
        addressLine2: ['', Validators.required],
        city: ['', Validators.required],
        district: ['', Validators.required]
      })
    })
  }
  password!: string;


  onSubmit() {
    // let regUser = this.registerForm.value;
    // console.log(regUser);
    //   this.registerForm.value.role = parseInt(this.registerForm.value.role);
    //   console.log(this.isPasswordMatch);
    //   if (this.isPasswordMatch) {
    //     this.authService.registerUser(this.registerForm.value).subscribe((data) => { });
    //     this.router.navigate([''])
    //   } else {
    //     this.toastr.info("Check your password");
    //   }
  }
}
