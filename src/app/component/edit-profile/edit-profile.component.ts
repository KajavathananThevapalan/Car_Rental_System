import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css'
})
export class EditProfileComponent implements OnInit {
  editUserForm!: FormGroup;
  isLoading: boolean = true;
  user: any = null;
  userId!: number;

  constructor(
    private route: ActivatedRoute, private userService: UserService, private fb: FormBuilder,
    private toastr: ToastrService, private router: Router) {

  }

  ngOnInit(): void {
    this.userId = Number(this.route.snapshot.paramMap.get('id'));

    this.createForm();
    this.getUserDetails();
  }

  createForm(): void {
    this.editUserForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: [''],
      nic: ['', Validators.required],
      drivingLicenceNo: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      userRole: ['customer'],
      profileImage: [''],
      drivingLicenseFront: ['', [Validators.required]],
      drivingLicenseBack: ['', [Validators.required]],
      address: this.fb.group({
        addressLine1: [''],
        addressLine2: [''],
        city: [''],
        district: [''],
        country: ['']
      })
    });
  }

  getUserDetails(): void {
    this.userService.getUserById(this.userId).subscribe(
      (data) => {
        this.user = data;
        this.editUserForm.patchValue(data);
        this.isLoading = false;
      },
      (error) => {
        this.toastr.error('Error fetching user details');
        this.isLoading = false;
      }
    );
  }

  onSubmit(): void {
    if (this.editUserForm.valid) {
      this.userService.updateUser(this.userId, this.editUserForm.value).subscribe(
        (data) => {
          this.toastr.success('User details updated successfully');
          this.router.navigate(['/profile']);
        },
        (error) => {
          this.toastr.error('Error updating user details');
        }
      );
    } else {
      this.toastr.error('Please fill out the form correctly.');
    }
  }

  cancelEdit(): void {
    this.router.navigate(['/profile']);
  }

  // Utility method to get form control by name
  getControl(name: string): AbstractControl {
    return this.editUserForm.get(name) as AbstractControl;
  }
}