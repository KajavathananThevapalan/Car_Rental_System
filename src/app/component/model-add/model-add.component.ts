import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Brand } from "../../services/admin-service.service";
import { BrandService } from "../../services/brand.service";
import { ModelService } from "../../services/model.service";

@Component({
  selector: 'app-model-add',
  templateUrl: './model-add.component.html',
  styleUrls: ['./model-add.component.css'],
})

export class ModelAddComponent implements OnInit {

  modelId: number;
  isEditMode = false;
  addModelForm: FormGroup;
  brands: Brand[] = [];

  constructor(
    private fb: FormBuilder, private modelService: ModelService, private brandService: BrandService,
    private route: ActivatedRoute, private router: Router, private toastr: ToastrService) {

    const editId = Number(this.route.snapshot.paramMap.get('modelId'));
    console.log(editId);

    if (editId) {
      this.isEditMode = true;
    } else {
      this.isEditMode = false;
    }

    this.modelId = editId;

    this.addModelForm = this.fb.group({
      name: ['', Validators.required],
      brandId: ['', Validators.required],
      year: [new Date().getFullYear(), [Validators.required, Validators.min(1886)]],
      engineType: ['', Validators.required],
      fuelType: ['', Validators.required],
      transmissionType: ['', Validators.required],
      horsepower: ['', Validators.min(0)],
      doors: [4, Validators.min(1)],
      seats: [4, Validators.min(1)],
      fuelEfficiency: ['', Validators.min(0)],
      category: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.brandService.getBrands().subscribe(data => {
      this.brands = data;
    })

    if (this.isEditMode) {
      this.modelService.getModel(this.modelId).subscribe(data => {
        console.log(data);
        this.addModelForm.patchValue({
          name: data.name,
          brandId: data.brandId,
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
      }, error => {
        this.toastr.error("Model is not found");
      });
    }
  }

  onSubmit(): void {
    const modelData = this.addModelForm.value;
    // console.log("Model data being sent:", modelData);
    modelData.brandId = parseInt(modelData.brandId, 10);

    if (this.isEditMode) {
      modelData.modelId = this.modelId;
      this.modelService.updateModel(modelData).subscribe(
        (response) => {
          console.log('Update Response:', response);
          this.toastr.success('Model updated successfully');
          this.router.navigate(['/admin/manage-models']);
        },
        (error) => {
          console.error('Error while updating model:', error);
          this.toastr.error('Error updating model');
        }
      );
    } else {
      this.modelService.createModel(modelData).subscribe(
        (response) => {
          // console.log('Create Response:', response);

          if (response) {
            this.toastr.success('Model created successfully');
            this.router.navigate(['/admin/manage-models']);
          } else {
            console.error('Unexpected response structure:', response);
            this.toastr.error('Error creating model');
          }
        },
        (error) => {
          console.error('Error while creating model:', error);
          this.toastr.error('Error creating model');
        }
      );
    }
  }

  onClose() {
    this.router.navigate(['/admin/manage-models']);
  }
}