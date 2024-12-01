import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminServiceService, CarImages, Model } from '../../services/admin-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-car-add',
  templateUrl: './car-add.component.html',
  styleUrl: './car-add.component.css'
})
export class CarAddComponent implements OnInit {
  
  carId: number;
  isEditMode = false;
  addCarForm: FormGroup;

  models: Model[] = []; // You can define the type for models if you have a specific type.
  carImages: CarImages[] = [];
  
  constructor(
    private fb: FormBuilder,
    private adminService: AdminServiceService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {
    // Determine if the component is in edit mode based on the carId parameter in the route
    const editId = Number(this.route.snapshot.paramMap.get('carId'));
    if (editId) {
      this.isEditMode = true;
    } else {
      this.isEditMode = false;
    }
    this.carId = editId;

    // Initialize form
    this.addCarForm = this.fb.group({
      licensePlate: ['', Validators.required],
      modelId: ['', Validators.required],
      color: ['', Validators.required],
      status: ['', Validators.required],
      pricePerDay: [0.01, [Validators.required, Validators.min(0.01)]],
      currentMileage: [0, [Validators.required, Validators.min(0)]],
      registrationNumber: ['', Validators.required],
      yearOfManufacture: [2024, [Validators.required, Validators.min(1900), Validators.max(new Date().getFullYear())]],
      viewCount: [0],
      carImages: this.fb.array([  // FormArray for images
        this.fb.group({
          imageUrl: ['', Validators.required],
          imageType: ['', Validators.required]
        })
      ]),
    });
  }
  // Getter to access the images FormArray
  get carImage() {
    return (this.addCarForm.get('carImages') as FormArray);
  }

  // Add a new image entry to the FormArray
  addImage() {
    this.carImage.push(this.fb.group({
      imageUrl: ['', Validators.required],
      imageType: ['', Validators.required]
    }));
  }

  ngOnInit(): void {
    // Fetch the available models
    this.adminService.getModels().subscribe(data => {
      this.models = data;
    });

    // If editing an existing car, fetch the car data
    if (this.isEditMode) {
      this.adminService.getCar(this.carId).subscribe(data => {
        console.log(data);
        this.addCarForm.patchValue({
          licensePlate: data.licensePlate,
          color: data.color,
          status: data.status,
          pricePerDay: data.pricePerDay,
          currentMileage: data.currentMileage,
          registrationNumber: data.registrationNumber,
          yearOfManufacture: data.yearOfManufacture,
          viewCount: data.viewCount,
          modelId: data.modelId,
          carImages: data.carImages, // Handle images
        });
      }, error => {
        this.toastr.error('Car not found');
      });
    }
  }

  onSubmit(): void {
    const carData = this.addCarForm.value;

    if (this.isEditMode) {
      // Update car details
      carData.carId = this.carId;
      this.adminService.updateCar(carData).subscribe(
        (response) => {
          this.toastr.success('Car updated successfully');
          this.router.navigate(['/admin/manage-cars']);
        },
        (error) => {
          this.toastr.error('Error updating car');
        }
      );
    } else {
      // Create new car
      this.adminService.createCar(carData).subscribe(
        (response) => {
          this.toastr.success('Car added successfully');
          this.router.navigate(['/admin/manage-cars']);
        },
        (error) => {
          this.toastr.error('Error adding car');
        }
      );
    }
  }
}