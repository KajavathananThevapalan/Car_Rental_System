import { Component } from '@angular/core';
import { Model } from '../../services/admin-service.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ModelService } from '../../services/model.service';

@Component({
  selector: 'app-manage-models',
  templateUrl: './manage-models.component.html',
  styleUrl: './manage-models.component.css'
})
export class ManageModelsComponent {

  constructor(private modelService: ModelService, private toastr: ToastrService, private router: Router) { }

  isLoading: boolean = true;
  errorMessage: string = '';
  searchQuery: string = '';

  models: Model[] = [];

  ngOnInit(): void {
    this.loadModels();
  }

  onDelete(modelId: number) {
    if (confirm("Do you want to delete this model?")) {
      this.modelService.deleteModel(modelId).subscribe((data: any) => {
        this.toastr.success("success");
        this.loadModels();
      })
    }
  }

  onEdit(modelId: number) {
    this.router.navigate(['admin/model-edit/', modelId])
  }

  loadModels(): void {
    this.isLoading = true;
    this.modelService.getModels().subscribe(
      (data) => {
        this.isLoading = false;
        this.models = data;
      },
      (error) => {
        this.isLoading = false;
        this.errorMessage = 'Failed to load models. Please try again later.';
        console.error('Error fetching models:', error);
        this.toastr.error('Error fetching models. Please try again.');
      }
    );
  }

  filteredModels() {
    if (!this.searchQuery) {
      return this.models;
    }

    return this.models.filter(model =>
      model.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      model.category.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }
}