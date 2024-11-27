import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdminServiceService } from '../../../services/admin-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  
  brands: any[] = [];
  modals:any[]=[];
  cars:any[]=[];

  constructor(private router:Router,
    private adminServiceService:AdminServiceService

  ){}

  ngOnInit(): void {
    this.loadBrands();
    this.loadmodal();
    this,this.loadcars();
  }


  loadBrands() {
    this.adminServiceService.getBrands().subscribe(
      (data: any[]) => {
        this.brands = data; 
      },
      (error: any) => {
        console.error('Error fetching brands:', error);
      }
    );
  };
  loadmodal(){
    this.adminServiceService.getModels().subscribe(
      (data: any[]) => {
        this.modals = data; 
      },
      (error: any) => {
        console.error('Error fetching brands:', error);
      }
    );
  };
  loadcars(){
   this.adminServiceService.getCars().subscribe(
    (data: any[]) => {
      this.cars = data; 
    },
    (error: any) => {
      console.error('Error fetching brands:', error);
    }
  );
  }


}
