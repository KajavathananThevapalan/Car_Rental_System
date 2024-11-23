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

  // checkPassword(event: any) {
  //   console.log(event);
  //   if (this.password == event.target?.value) {
  //     this.isPasswordMatch = true;
  //   }
  // }

  registerForm!: FormGroup;
  regUsers: IUserRegister[] = [];

  constructor(private fb: FormBuilder, private router: Router, private toastr: ToastrService, private authService: AuthorizationService) {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: [''],
      nic: ['', Validators.required], // NIC field
      drivingLicenceNo: ['', Validators.required], // Driving Licence No. field
      email: ['', [Validators.required, Validators.email]], // Email field
      password: ['', [Validators.required, Validators.minLength(6), Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{6,}$')]],
      phone: ['', [Validators.required, Validators.pattern(/^\+?[1-9]\d{1,14}$/)]], // Phone validation
      role: ['Customer', Validators.required], // Default to Customer, may allow switching to Admin
      imageurl:[''],
      imagetype:[' '],
      address: this.fb.group({
        addressLine1: [''],
        addressLine2: [''],
        city: [''],
        district: [''],
        country: ['']
      }),
      terms: [false]
    })
  }
  password!: string;


  onSubmit() {
    let regUser = this.registerForm.value;
    console.log(regUser);
    console.log('Form Valid:', this.registerForm);
    console.log('Form Value:', this.registerForm.value);
      // this.registerForm.value.i = parseInt(this.registerForm.value.role);
      console.log(this.isPasswordMatch);

        this.authService.registerUser(this.registerForm.value).subscribe((data) => {
          console.log(data)
         });
      //  this.router.navigate(['']);
        this.toastr.info("Success");
      
  }
}
