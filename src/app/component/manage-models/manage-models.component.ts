import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Model } from "../../services/admin-service.service";
import { ModelService } from "../../services/model.service";

@Component({
  selector: 'app-manage-models',
  templateUrl: './manage-models.component.html',
  styleUrls: ['./manage-models.component.css']
})
export class ManageModelsComponent implements OnInit {

  isLoading: boolean = true;
  errorMessage: string = '';
  searchQuery: string = '';
  models: Model[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalItems: number = 0;
  paginatedModels: Model[] = [];

  constructor(private modelService: ModelService, private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {
    this.loadModels();
  }

  loadModels(): void {
    this.isLoading = true;
    this.modelService.getModels().subscribe(
      (data) => {
        this.isLoading = false;
        this.models = data;
        this.totalItems = this.models.length;
        this.filterModels();
      },
      (error) => {
        this.isLoading = false;
        this.errorMessage = 'Failed to load models. Please try again later.';
        console.error('Error fetching models:', error);
        this.toastr.error('Error fetching models. Please try again.');
      }
    );
  }

  filterModels(): void {
    let filteredModels = this.models;

    if (this.searchQuery) {
      filteredModels = this.models.filter(model =>
        model.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        model.category.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }

    this.paginateModels(filteredModels);
  }

  paginateModels(filteredModels: Model[]): void {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedModels = filteredModels.slice(start, end);
  }

  // Change page
  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages()) {
      this.currentPage = page;
      this.filterModels();
    }
  }

  totalPages(): number {
    return Math.ceil(this.models.length / this.itemsPerPage);
  }

  onDelete(modelId: number) {
    if (confirm("Do you want to delete this model?")) {
      this.modelService.deleteModel(modelId).subscribe((data: any) => {
        this.toastr.success("Model deleted successfully");
        this.loadModels();
      });
    }
  }

  onEdit(modelId: number) {
    this.router.navigate(['admin/model-edit/', modelId]);
  }
}
