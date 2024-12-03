import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Model } from '../../services/admin-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarDetails } from '../../models/CarDetails';
import { CarService } from '../../services/car.service';
import { ModelService } from '../../services/model.service';

@Component({
  selector: 'app-car-add',
  templateUrl: './car-add.component.html',
  styleUrls: ['./car-add.component.css']
})
export class CarAddComponent implements OnInit {

  carId: number;
  isEditMode = false;
  addCarForm: FormGroup;
  cars!: CarDetails[]; // Assuming you have a Cars list
  models: Model[] = [];

  constructor(
    private fb: FormBuilder, private carService: CarService,
    private route: ActivatedRoute, private router: Router, 
    private toastr: ToastrService, private modelService: ModelService
  ) {

    const editId = Number(this.route.snapshot.paramMap.get('carId'));

    if (editId) {
      this.isEditMode = true;
    } else {
      this.isEditMode = false;
    }
    this.carId = editId;

    // Initialize the form
    this.addCarForm = this.fb.group({
      licensePlate: ['', Validators.required],
      modelId: ['', Validators.required],
      color: ['', Validators.required],
      status: ['', Validators.required],
      pricePerDay: [0, [Validators.required, Validators.min(0.01)]],
      currentMileage: [0, [Validators.required, Validators.min(0)]],
      registrationNumber: ['', Validators.required],
      yearOfManufacture: [2024, [Validators.required, Validators.min(1900), Validators.max(new Date().getFullYear())]],
      tankCapacity: ['', [Validators.required]],
      frontView: ['', [Validators.required]],
      backView: [''],
      sideView: [''],
      interior: ['']
    });
  }

  ngOnInit(): void {
    this.modelService.getModels().subscribe(data => {
      this.models = data;
    });

    if (this.isEditMode) {
      this.carService.getCar(this.carId).subscribe(data => {
        this.addCarForm.patchValue({
          licensePlate: data.licensePlate,
          color: data.color,
          status: data.status,
          pricePerDay: data.pricePerDay,
          currentMileage: data.currentMileage,
          registrationNumber: data.registrationNumber,
          yearOfManufacture: data.yearOfManufacture,
          frontView: data.frontView,
          backView: data.BackView,
          sideView: data.sideView,
          interior: data.interior,
          viewCount: data.viewCount,
          tankCapacity: data.tankCapacity,
          modelId: data.modelId,
        });
      }, error => {
        this.toastr.error('Car not found');
      });
    }
  }

  onSubmit(): void {
    // Validate form before submitting
    if (this.addCarForm.invalid) {
      this.toastr.error('Please fill in all required fields');
      return;
    }

    const carData = this.addCarForm.value;
    console.log(carData);

    if (this.isEditMode) {
      carData.carId = this.carId;

      this.carService.updateCar(carData).subscribe(
        (response) => {
          this.toastr.success('Car updated successfully');
          this.router.navigate(['/admin/manage-cars']);
        },
        (error) => {
          console.error('Error updating car:', error);
          this.toastr.error('Error updating car');
        }
      );
    } else {
      this.carService.createCar(carData).subscribe(
        (response) => {
          this.toastr.success('Car added successfully');
          this.router.navigate(['/admin/manage-cars']);
        },
        (error) => {
          console.error('Error adding car:', error);
          this.toastr.error('Error adding car');
        }
      );
    }
  }

  onClose() {
    this.router.navigate(['/admin/manage-cars']);
  }
}
