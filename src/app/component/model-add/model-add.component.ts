import { Component, OnInit } from '@angular/core';
import { AdminServiceService } from '../../services/admin-service.service';
import { ModelService } from '../../services/model.service';


@Component({
  selector: 'app-model-add', 
  templateUrl: './model-add.component.html', 
  styleUrl: './model-add.component.css'
})
export class ModelComponent implements OnInit {
  brands: any[] = [];
  modelData = {
    modelName: '',
    brandId: '',
    year: new Date().getFullYear(),
    fuelType: 'Petrol',
  };

  constructor(
    private modelService: ModelService,
    private adminServiceService: AdminServiceService
  ) {}

  ngOnInit(): void {
    this.loadBrands();
  }

  loadBrands() {
    this.adminServiceService.getBrands().subscribe(
      (data) => {
        this.brands = data;
      },
      (error) => {
        console.error('Error fetching brands:', error);
      }
    );
  }

  onSubmit() {
    this.modelService.addModel(this.modelData).subscribe(
      (response) => {
        console.log('Model added successfully:', response);
        // Reset form
        this.modelData = {
          modelName: '',
          brandId: '',
          year: new Date().getFullYear(),
          fuelType: 'Petrol',
        };
      },
      (error) => {
        console.error('Error adding model:', error);
      }
    );
  }
}
