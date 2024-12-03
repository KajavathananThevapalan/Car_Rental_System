import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BrandService } from '../../services/brand.service';

@Component({
  selector: 'app-brand-add',
  templateUrl: './brand-add.component.html',
  styleUrl: './brand-add.component.css'
})
export class BrandAddComponent implements OnInit {
  brandId: number;
  isEditMode = false;
  addBrandForm: FormGroup;

  constructor(private fb: FormBuilder, private brandService: BrandService, private route: ActivatedRoute, private router: Router, private toastr: ToastrService) {
    const editId = Number(this.route.snapshot.paramMap.get("brandId"));
    // console.log(editId);
    
    if (editId) {
      this.isEditMode = true;
    } else {
      this.isEditMode = false;
    }

    this.brandId = editId;

    this.addBrandForm = this.fb.group({
      name: ['', [Validators.required]],
      country: ['', [Validators.required]],
      foundedYear: ['', [Validators.required]],
      logoUrl: ['', [Validators.required]],
      website: ['', [Validators.required]],
      description: ['']
    })
  }

  ngOnInit(): void {
    if (this.isEditMode == true) {
      this.brandService.getBrand(this.brandId).subscribe(data => {
        // console.log(data);
        this.addBrandForm.patchValue({
          name: data.name,
          country: data.country,
          foundedYear: data.foundedYear,
          logoUrl: data.logoUrl,
          website: data.website,
          description: data.description,
        });
      }, error => {
        this.toastr.error("Brand is not found");
      });
    }
  }

  onSubmit(): void {
    let brand = this.addBrandForm.value;
    console.log("Form data being sent:", brand);
  
    if (this.isEditMode) {
      brand.brandId = this.brandId;
      console.log("Updated brand data with brandId:", brand);
  
      // Call the update service with responseType 'text'
      this.brandService.updateBrand(brand).subscribe(
        (data) => {
          console.log("Update response:", data);  // 'data' will be plain text
          this.toastr.success('Brand updated successfully');  // Display the plain text response
          this.router.navigate(['/admin/manage-brands']);
        },
        (error) => {
          console.error("Error while updating brand:", error);
          this.toastr.error("Error updating brand. Please try again.");
        }
      );
    } else {
      // Call the create service with responseType 'text'
      this.brandService.createBrand(brand).subscribe(
        (data) => {
          console.log("Create response:", data);  // 'data' will be plain text
          this.toastr.success('Brand added successfully');  // Display the plain text response
          this.router.navigate(['/admin/manage-brands']);
        },
        (error) => {
          console.error("Error while creating brand:", error);
          this.toastr.error("Error adding brand. Please try again.");
        }
      );
    }
  }

  onClose(){
    this.router.navigate(['/admin/manage-brands']);
  }
}