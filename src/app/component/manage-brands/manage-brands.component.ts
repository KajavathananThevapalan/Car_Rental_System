import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { BrandService } from "../../services/brand.service";

@Component({
  selector: 'app-manage-brands',
  templateUrl: './manage-brands.component.html',
  styleUrl: './manage-brands.component.css'
})
export class ManageBrandsComponent {
  constructor(private brandService: BrandService, private toastr: ToastrService, private router: Router) { }

  isLoading: boolean = true;
  errorMessage: string = '';
  brands: any[] = [];
  searchQuery: string = '';

  ngOnInit(): void {
    this.loadBrands();
  }

  onDelete(brandId: number) {
    if (confirm("Do you want to delete this brand?")) {
      this.brandService.deleteBrand(brandId).subscribe((data: any) => {
        this.toastr.success("success");
        this.loadBrands();
      })
    }
  }

  onEdit(brandId: number) {
    this.router.navigate(['admin/brand-edit/', brandId])
  }

  loadBrands(): void {
    this.isLoading = true;
    this.brandService.getBrands().subscribe(
      (data) => {
        this.isLoading = false;
        this.brands = data;
      },
      (error) => {
        this.isLoading = false;
        this.errorMessage = 'Failed to load brands. Please try again later.';
        console.error('Error fetching brands:', error);
        this.toastr.error('Error fetching brands. Please try again.');
      }
    );
  }

  filteredBrands() {
    if (!this.searchQuery) {
      return this.brands;
    }

    return this.brands.filter(brand =>
      brand.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      brand.country.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      brand.website.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      brand.description.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }
}