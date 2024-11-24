import { Component } from '@angular/core';
import { AdminServiceService, Brand } from '../services/admin-service.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-brands',
  templateUrl: './manage-brands.component.html',
  styleUrl: './manage-brands.component.css'
})
export class ManageBrandsComponent {
  constructor(private adminService : AdminServiceService,private toastr : ToastrService,private router : Router){

  }
  searchInput='';
  
  brands: Brand[]=[];
  


  ngOnInit(): void {
    this.loadBrands();
    }

  onDelete(brandId:number){
    if(confirm("Do you want to delete this brand?")){
      this.adminService.deleteBrand(brandId).subscribe((data: any) =>{
      this.toastr.success("success");
        this.loadBrands();
    })
    }
  }

  onEdit(brandId:number){
    this.router.navigate(['admin/brand-edit/',brandId])
  }

  loadBrands(){
    this.adminService.getBrands().subscribe((data: any) =>{
      this.brands=data;
  })
  }

}

