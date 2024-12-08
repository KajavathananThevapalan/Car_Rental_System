import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { BrandService } from "../../services/brand.service";

@Component({
  selector: 'app-manage-brands',
  templateUrl: './manage-brands.component.html',
  styleUrls: ['./manage-brands.component.css']
})
export class ManageBrandsComponent implements OnInit {
  
  isLoading: boolean = true;
  errorMessage: string = '';
  brands: any[] = [];
  searchQuery: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalItems: number = 0;
  paginatedBrands: any[] = [];

  constructor(
    private brandService: BrandService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadBrands();
  }

  loadBrands(): void {
    this.isLoading = true;
    this.brandService.getBrands().subscribe(
      (data) => {
        this.isLoading = false;
        this.brands = data;
        this.totalItems = this.brands.length;
        this.filterBrands();
      },
      (error) => {
        this.isLoading = false;
        this.errorMessage = 'Failed to load brands. Please try again later.';
        console.error('Error fetching brands:', error);
        this.toastr.error('Error fetching brands. Please try again.');
      }
    );
  }

  filterBrands(): void {
    let filteredBrands = this.brands;
    if (this.searchQuery) {
      filteredBrands = this.brands.filter(brand =>
        brand.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        brand.country.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        brand.website.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        brand.description.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }

    this.paginateBrands(filteredBrands);
  }

  paginateBrands(filteredBrands: any[]): void {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedBrands = filteredBrands.slice(start, end);
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages()) {
      this.currentPage = page;
      this.filterBrands();
    }
  }

  totalPages(): number {
    return Math.ceil(this.brands.length / this.itemsPerPage);
  }

  onDelete(brandId: number): void {
    if (confirm("Do you want to delete this brand?")) {
      this.brandService.deleteBrand(brandId).subscribe((data: any) => {
        this.toastr.success("Brand deleted successfully");
        this.loadBrands();
      })
    }
  }

  onEdit(brandId: number): void {
    this.router.navigate(['admin/brand-edit/', brandId]);
  }
}
