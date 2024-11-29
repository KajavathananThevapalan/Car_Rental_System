import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthorizationService } from '../../services/authorization.service';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../models/User';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  isPasswordMatch: boolean = false;

  registerForm!: FormGroup;
  regUsers: User[] = [];

  constructor(
    private fb: FormBuilder, 
    private router: Router, 
    private toastr: ToastrService, 
    private authService: AuthorizationService
  ) {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: [''],
      nic: ['', Validators.required],
      drivingLicenceNo: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      phone: ['', [Validators.required]],
      userRole: ['customer', Validators.required],
      images: this.fb.array([  // FormArray for images
        this.fb.group({
          imageUrl: ['', Validators.required],
          imageType: ['profile', Validators.required]
        })
      ]),
      address: this.fb.group({
        addressLine1: [''],
        addressLine2: [''],
        city: [''],
        district: [''],
        country: ['']
      })
    });
  }

  // Getter to access the images FormArray
  get images() {
    return (this.registerForm.get('images') as FormArray);
  }

  // Add a new image entry to the FormArray
  addImage() {
    this.images.push(this.fb.group({
      imageUrl: ['', Validators.required],
      imageType: ['profile', Validators.required]
    }));
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      this.toastr.error("Please fill out the form correctly.");
      return;
    }

    let regUser = this.registerForm.value;

    // console.log('Form Value:', regUser);

    this.authService.registerUser(regUser).subscribe({
      next: (data) => {
        // console.log('Registration successful:', data);
        this.toastr.success("Registration successful.");
        this.router.navigate(['/login']); // Navigate to login page after successful registration
      },
      error: (err) => {
        console.error('Registration error:', err);
        this.toastr.error("Registration failed. Please try again.");
      }
    });
  }
}
