import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminServiceService } from '../../services/admin-service.service';

@Component({
  selector: 'app-model-add',
  templateUrl: './model-add.component.html',
  styleUrls: ['./model-add.component.css'],
})

export class ModelAddComponent implements OnInit {

  modelId!: number;
  // engineTypes = Object.values(EngineType);
  // fuelTypes = Object.values(FuelType);
  // transmissionTypes = Object.values(TransmissionType);
  isEditMode = false;
  addModelForm: FormGroup;

  // users: User[] = [];
  constructor(
    private fb: FormBuilder,
    private adminService: AdminServiceService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {
    // Determine if the component is in edit mode
    const editId = Number(this.route.snapshot.paramMap.get('modelId'));
    this.isEditMode = !!editId; // Simplified condition
    this.modelId = editId;

    // Initialize form
    this.addModelForm = this.fb.group({
      name: ['', Validators.required],
      brandId:['',Validators.required],
      year: [new Date().getFullYear(), [Validators.required, Validators.min(1886)]],
      engineType: ['', Validators.required],
      fuelType: ['', Validators.required],
      transmissionType: ['', Validators.required],
      mileage: [0, Validators.min(0)],
      horsepower: [0, Validators.min(0)],
      doors: [4, Validators.min(1)],
      seats: [4, Validators.min(1)],
      fuelEfficiency: [0, Validators.min(0)],
      category: ['', Validators.required],
      updatedAt: [Date.now()],
      updatedBy: [''],
    });
  }

  ngOnInit(): void {
    // Fetch data for editing
    if (this.isEditMode) {
      this.adminService.getModel(this.modelId).subscribe(
        (data) => {
          this.addModelForm.patchValue(data); // Populate form with model data
        },
        (error) => {
          this.toastr.error('Model not found');
        }
      );
    }
  }

  onSubmit(): void {
    const modelData = this.addModelForm.value;

    if (this.isEditMode) {
      // Update model
      modelData.modelId = this.modelId;
      this.adminService.updateModel(modelData).subscribe(
        (response) => {
          this.toastr.success('Model updated successfully');
          this.router.navigate(['/admin/carmanagement']);
        },
        (error) => {
          this.toastr.error('Error updating model');
        }
      );
    } else {
      // Create new model
      this.adminService.createModel(modelData).subscribe(
        (response) => {
          this.toastr.success('Model created successfully');
          this.router.navigate(['/admin/carmanagement']);
        },
        (error) => {
          this.toastr.error('Error creating model');
        }
      );
    }
  }
}
