import { Component } from '@angular/core';
import { AdminServiceService, Car, Model } from '../../services/admin-service.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { CarDetails } from '../../models/CarDetails';

@Component({
  selector: 'app-manage-cars',
  templateUrl: './manage-cars.component.html',
  styleUrl: './manage-cars.component.css'
})
export class ManageCarsComponent {

  constructor(private adminService: AdminServiceService, private toastr: ToastrService, private router: Router) { }

  isLoading: boolean = true;
  errorMessage: string = '';
  searchInput = '';
  cars: CarDetails[] = [];

  ngOnInit(): void {
    this.getCars();
  }

  onDelete(carId: number) {
    if (confirm("Do you want to delete this Car?")) {
      this.adminService.deleteCar(carId).subscribe((data: any) => {
        this.toastr.success("success");
        this.getCars();
      })
    }
  }

  onEdit(carId: number) {
    this.router.navigate(['admin/car-edit/', carId])
  }

  getCars(): void {
    this.isLoading = true;
    this.adminService.getCars().subscribe(
      (data) => {
        this.isLoading = false;
        this.cars = data;
      },
      (error) => {
        this.isLoading = false;
        this.errorMessage = 'Failed to load cars. Please try again later.';
        console.error('Error fetching cars:', error);
        this.toastr.error('Error fetching cars. Please try again.');
      }
    );
  }
}