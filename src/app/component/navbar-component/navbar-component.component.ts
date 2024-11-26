import { Component } from '@angular/core';
import { AdminServiceService } from '../../services/admin-service.service';
import { ModelService } from '../../services/model.service';

@Component({
  selector: 'app-navbar-component',
  templateUrl: './navbar-component.component.html',
  styleUrl: './navbar-component.component.css'
})
export class NavbarComponentComponent {
  brands: any[] = [];
  modals:any[]=[];

  constructor(private adminServiceService: AdminServiceService,
    private modelService:ModelService) {}

  ngOnInit(): void {
    this.loadBrands();
  }

  loadBrands() {
    this.adminServiceService.getBrands().subscribe(
      (data) => {
        this.brands = data; 
      },
      (error) => {
        console.error('Error fetching brands:', error);
      }
    );
  };

  loadmodal(){
    this.modelService.getModels().subscribe(
      (data) => {
        this.modals = data; 
      },
      (error) => {
        console.error('Error fetching brands:', error);
      }
    );
  }
}
