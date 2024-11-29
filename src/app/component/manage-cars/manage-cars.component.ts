import { Component } from '@angular/core';
import { AdminServiceService, Car } from '../../services/admin-service.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-cars',
  templateUrl: './manage-cars.component.html',
  styleUrl: './manage-cars.component.css'
})
export class ManageCarsComponent {

  constructor(private adminService : AdminServiceService,private toastr : ToastrService,private router : Router){

  }
  searchInput='';
  
  cars: Car[]=[];
  


  ngOnInit(): void {
    this.loadCars();
    }

  onDelete(carId:number){
    if(confirm("Do you want to delete this model?")){
      this.adminService.deleteModel(carId).subscribe((data: any) =>{
      this.toastr.success("success");
        this.loadCars();
    })
    }
  }

  onEdit(carId:number){
    this.router.navigate(['admin/car-edit/',carId])
  }

  loadCars(){
    this.adminService.getCars().subscribe((data: any) =>{
      this.cars=data;
  })
  }

}

