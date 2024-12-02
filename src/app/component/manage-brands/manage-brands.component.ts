import { Component } from '@angular/core';
import { AdminServiceService, Brand } from '../../services/admin-service.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-brands',
  templateUrl: './manage-brands.component.html',
  styleUrl: './manage-brands.component.css'
})
export class ManageBrandsComponent {
  constructor(private adminService: AdminServiceService, private toastr: ToastrService, private router: Router) { }

  isLoading: boolean = true;
  errorMessage: string = '';
  searchInput = '';

  brands: Brand[] = [];

  ngOnInit(): void {
    this.loadBrands();    
  }

  onDelete(brandId: number) {
    if (confirm("Do you want to delete this brand?")) {
      this.adminService.deleteBrand(brandId).subscribe((data: any) => {
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
    this.adminService.getBrands().subscribe(
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
}