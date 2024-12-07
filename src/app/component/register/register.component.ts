import { Component } from "@angular/core";
import { FormGroup, FormBuilder, Validators, FormArray } from "@angular/forms";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { AuthorizationService } from "../../services/authorization.service";
import { jwtDecode } from "jwt-decode";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm!: FormGroup;
  userRole: string = '';

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
      drivingLicenseFront: ['', [Validators.required]],
      drivingLicenseBack: ['', [Validators.required]],
      profileImage: [''],
      address: this.fb.group({
        addressLine1: [''],
        addressLine2: [''],
        city: [''],
        district: [''],
        country: ['']
      })
    });
  }

  ngOnInit(): void {
    this.checkUserRole();
  }

  checkUserRole(): void {
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      try {
        const decodedToken: any = jwtDecode(authToken);
        this.userRole = decodedToken?.UserRole;
        // console.log(decodedToken);
        
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
  }

  get images() {
    return (this.registerForm.get('images') as FormArray);
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      this.toastr.error("Please fill out the form correctly.");
      return;
    }

    let regUser = this.registerForm.value;

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
