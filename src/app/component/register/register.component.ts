import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { AuthorizationService } from "../../services/authorization.service";
import { jwtDecode } from "jwt-decode";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  userRole: string = '';

  constructor(
    private fb: FormBuilder, 
    private router: Router, 
    private toastr: ToastrService, 
    private authService: AuthorizationService
  ) {
    // Create the form group with the custom password match validator
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: [''],
      nic: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      userRole: ['customer', Validators.required],
      profileImage: [''],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmpassword: ['', [Validators.required]],
      drivingLicenceNo: ['', Validators.required],
      drivingLicenseFront: ['', [Validators.required]],
      drivingLicenseBack: ['', [Validators.required]],
      address: this.fb.group({
        addressLine1: [''],
        addressLine2: [''],
        city: [''],
        district: [''],
        country: ['']
      })
    }, { validators: this.passwordMatchValidator() });  // Apply the custom validator here
  }

  passwordMatchValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const password = control.get('password')?.value;
      const confirmPassword = control.get('confirmpassword')?.value;
  
      if (password && confirmPassword && password !== confirmPassword) {
        return { passwordsDoNotMatch: true };
      }
      return null;
    };
  }

  ngOnInit(): void {
    this.checkUserRole();
  }

  // Method to check user role from JWT token
  checkUserRole(): void {
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      try {
        const decodedToken: any = jwtDecode(authToken);
        this.userRole = decodedToken?.UserRole;
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
  }

  // Method to handle form submission
  onSubmit() {
    if (this.registerForm.invalid) {
      this.toastr.error("Please fill out the form correctly.");
      return;
    }

    let regUser = this.registerForm.value;

    // Call the registration API
    this.authService.registerUser(regUser).subscribe({
      next: (data) => {
        this.toastr.success("Registration successful.");
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Registration error:', err);
        this.toastr.error("Registration failed. Please try again.");
      }
    });
  }
}
