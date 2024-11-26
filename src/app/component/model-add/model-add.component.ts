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
      mileage: [0, Validators.min(0)],
      horsepower: [0, Validators.min(0)],
      doors: [4, Validators.min(1)],
      seats: [4, Validators.min(1)],
      fuelEfficiency: [0, Validators.min(0)],
      category: ['', Validators.required],
      updatedBy: [''],
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
          brandId:data.brands.brandId,
          year: data.year,
          engineType: data.engineType,
          fuelType: data.fuelType,
          transmissionType: data.transmissionType,
          mileage: data.mileage,
          horsepower: data.horsepower,
          doors: data.doors,
          seats: data.seats,
          fuelEfficiency: data.fuelEfficiency,
          category: data.category,
          updatedBy: data.updatedBy,
        });
      },error => {
        this.toastr.error("Model is not found");
      });
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
          this.router.navigate(['/admin/manage-models']);
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
          this.router.navigate(['/admin/manage-models']);
        },
        (error) => {
          this.toastr.error('Error creating model');
        }
      );
    }
  }
}
