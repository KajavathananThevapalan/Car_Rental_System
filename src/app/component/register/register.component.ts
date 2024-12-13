import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { AuthorizationService } from "../../services/authorization.service";
import { jwtDecode } from "jwt-decode";
import { NotificationService } from "../../services/notification.service";
import { UserService } from "../../services/user.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  userRole: string = '';
  email: string = '';
  userId!: number;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private notificationService: NotificationService,
    private userService: UserService,
    private authService: AuthorizationService
  ) {
    // Create the form group with the custom password match validator
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: [''],
      nic: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      userRole: ['customer', Validators.required],
      profileImage: ['https://th.bing.com/th/id/R.1a169ee0e11d6f85260b7864aa916f2c?rik=F6uhG3K5RxD0Bg&pid=ImgRaw&r=0'],
      password: ['', [Validators.required, Validators.minLength(4)]],
      confirmpassword: ['', [Validators.required]],
      drivingLicenceNo: ['', Validators.required],
      drivingLicenseFront: ['', [Validators.required,Validators.pattern('https?://(?:www\\.)?.+')]],
      drivingLicenseBack: ['', [Validators.required,Validators.pattern('https?://(?:www\\.)?.+')]],
      address: this.fb.group({
        addressLine1: [''],
        addressLine2: [''],
        city: [''],
        district: [''],
        country: ['']
      })
    }, { validators: this.passwordMatchValidator() });
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

  checkUserRole(): void {
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      try {
        const decodedToken: any = jwtDecode(authToken);
        this.userRole = decodedToken?.UserRole;
        this.userId = Number(decodedToken?.userId);
        this.email = decodedToken?.email;
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      this.toastr.error("Please fill out the form correctly.");
      return;
    }

    let regUser = this.registerForm.value;

    this.authService.registerUser(regUser).subscribe({
      next: (data) => {
        const notification = {
          email: this.email,
          message: 'User register successful!',
          type: 'Rental Booking',
          userId: this.userId
        };
        this.notificationService.sendNotification(notification).subscribe(
          (response) => {
            console.log('Notification sent successfully', response);
          },
          (error) => {
            console.error('Error sending notification', error);
          }
        );

        this.toastr.success("Registration successful.");
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.log('Registration error:', err.message);
        this.toastr.error("Registration failed. Please try again.");
      }
    });
  }
}
