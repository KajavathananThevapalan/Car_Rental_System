import { Component } from '@angular/core';
import { AdminServiceService, Model } from '../../services/admin-service.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-models',
  templateUrl: './manage-models.component.html',
  styleUrl: './manage-models.component.css'
})
export class ManageModelsComponent {

  constructor(private adminService : AdminServiceService,private toastr : ToastrService,private router : Router){

  }
  searchInput='';
  
  models: Model[]=[];
  


  ngOnInit(): void {
    this.loadModels();
    }

  onDelete(modelId:number){
    if(confirm("Do you want to delete this model?")){
      this.adminService.deleteModel(modelId).subscribe((data: any) =>{
      this.toastr.success("success");
        this.loadModels();
    })
    }
  }

  onEdit(modelId:number){
    this.router.navigate(['admin/model-edit/',modelId])
  }

  loadModels(){
    this.adminService.getModels().subscribe((data: any) =>{
      this.models=data;
  })
  }

}


