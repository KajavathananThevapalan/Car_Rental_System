import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminServiceService, Brand } from '../../services/admin-service.service';

@Component({
  selector: 'app-model-add',
  templateUrl: './model-add.component.html',
  styleUrls: ['./model-add.component.css'],
})

export class ModelAddComponent implements OnInit {

  modelId: number;
  // engineTypes = Object.values(EngineType);
  // fuelTypes = Object.values(FuelType);
  // transmissionTypes = Object.values(TransmissionType);
  isEditMode = false;
  addModelForm: FormGroup;

  brands: Brand[] = [];
  
  constructor(
    private fb: FormBuilder,private adminService: AdminServiceService,private route: ActivatedRoute,private router: Router,
    private toastr: ToastrService) 
    {
    // Determine if the component is in edit mode
    const editId = Number(this.route.snapshot.paramMap.get('modelId'));
    if(editId){
      this.isEditMode = true;
    }else{
      this.isEditMode = false;
    }
    this.modelId = editId;

    // Initialize form
    this.addModelForm = this.fb.group({
      name: ['', Validators.required],
      brandId:['',Validators.required],
      year: [new Date().getFullYear(), [Validators.required, Validators.min(1886)]],
      engineType: ['', Validators.required],
      fuelType: ['', Validators.required],
      transmissionType: ['', Validators.required],
      horsepower: [0, Validators.min(0)],
      doors: [4, Validators.min(1)],
      seats: [4, Validators.min(1)],
      fuelEfficiency: [0, Validators.min(0)],
      category: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.adminService.getBrands().subscribe(data =>
      {
        this.brands = data;
      })

    // Fetch data for editing
    if (this.isEditMode) {
      this.adminService.getModel(this.modelId).subscribe(data => {
        console.log(data);
        this.addModelForm.patchValue({
          name: data.name,
          brandId:data.brandId,
          year: data.year,
          engineType: data.engineType,
          fuelType: data.fuelType,
          transmissionType: data.transmissionType,
          horsepower: data.horsepower,
          doors: data.doors,
          seats: data.seats,
          fuelEfficiency: data.fuelEfficiency,
          category: data.category
        });
      },error => {
        this.toastr.error("Model is not found");
      });
    }
  }

  onSubmit(): void {
    const modelData = this.addModelForm.value;
    console.log("Model data being sent:", modelData);
  
    // Convert brandId if it's a string
    modelData.brandId = parseInt(modelData.brandId, 10);
  
    if (this.isEditMode) {
      // If editing an existing model
      modelData.modelId = this.modelId;
      this.adminService.updateModel(modelData).subscribe(
        (response) => {
          // Log response and check the structure
          console.log('Update Response:', response);
          this.toastr.success('Model updated successfully');
          this.router.navigate(['/admin/manage-models']);
        },
        (error) => {
          // Log error details for debugging
          console.error('Error while updating model:', error);
          this.toastr.error('Error updating model');
        }
      );
    } else {
      // If creating a new model
      this.adminService.createModel(modelData).subscribe(
        (response) => {
          // Log response to understand its structure
          console.log('Create Response:', response);
          
          // Check if the response indicates success, adjust logic if necessary
          if (response) {  // Example: Adjust based on API response structure
            this.toastr.success('Model created successfully');
            this.router.navigate(['/admin/manage-models']);
          } else {
            // If the response is successful but not the expected structure
            console.error('Unexpected response structure:', response);
            this.toastr.error('Error creating model');
          }
        },
        (error) => {
          // Log the error details for debugging
          console.error('Error while creating model:', error);
          this.toastr.error('Error creating model');
        }
      );
    }
  }
  
}
