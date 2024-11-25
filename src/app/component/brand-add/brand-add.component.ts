import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminServiceService, Brand } from '../../services/admin-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-brand-add',
  templateUrl: './brand-add.component.html',
  styleUrl: './brand-add.component.css'
})
export class BrandAddComponent implements OnInit{
  brandId:number;
  isEditMode = false;
  addBrandForm :FormGroup;

  constructor(private fb : FormBuilder,private adminService : AdminServiceService,private route : ActivatedRoute, private router: Router,private toastr : ToastrService){
    const editId = Number(this.route.snapshot.paramMap.get("brandId"));
    
    if(editId){
      this.isEditMode = true;
    }else{
      this.isEditMode = false;
    }

    this.brandId = editId;

    this.addBrandForm = this.fb.group({
      name:['',[Validators.required]],
      country:['',[Validators.required]],
      foundedYear:['',[Validators.required]],
      logoUrl:['',[Validators.required]],
      website: ['',[Validators.required]],
      description: ['']
    })
  }



  ngOnInit(): void {
    if(this.isEditMode == true){
      this.adminService.getBrand(this.brandId).subscribe(data => {
        console.log(data);
        this.addBrandForm.patchValue({
          name :data.name,
          country: data.country,
          foundedYear: data.foundedYear,
          logoUrl: data.logoUrl,
          website:data.website,
          description:data.description,
        });
      },error => {
        this.toastr.error("Brand is not found");
      });
    }  
  }
       



  onSubmit() {
    let brand = this.addBrandForm.value;
    console.log(brand);
    
    if(this.isEditMode == true){
      brand.brandId =  this.brandId;

      console.log(brand.brandId);
      this.adminService.updateBrand(brand).subscribe(data => {
          this.toastr.success("Brand is updated Successfully...")
          this.router.navigate(['/admin/carmanagement']);
        }
      )
    }else{
    this.adminService.createBrand(brand).subscribe(data => {
      this.router.navigate(['/admin/carmanagement']);
    }
    )
    }

    
  }

}



