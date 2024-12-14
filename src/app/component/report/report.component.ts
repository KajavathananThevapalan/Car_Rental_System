import { Component, OnInit } from '@angular/core';
import { RentalService } from '../../services/rental.service';
import { UserService } from '../../services/user.service';
import { PaymentService } from '../../services/payment.service';
import { CarService } from '../../services/car.service';
import { BrandService } from '../../services/brand.service';
import { ModelService } from '../../services/model.service';
import { Rental } from '../../models/Rental';
import { Payment } from '../../models/Payment';
import { User } from '../../models/User';
import { Brand, Car, Model } from '../../services/admin-service.service';
import { CarDetails } from '../../models/CarDetails';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  totalRentals: number = 0;
  totalCompleted: number = 0;
  totalBooked: number = 0;
  totalPending: number = 0;
  totalDeclined: number = 0;
  totalReturned: number = 0;
  totalRented: number = 0;
  newUsers: number = 0;
  totalCars: number = 0;
  availableCars: number = 0;
  rentedCars: number = 0;
  reservedCars: number = 0;
  totalBrands: number = 0;
  totalModels: number = 0;
  GasolineTypeModel: number = 0;
  ElectricTypeModel: number = 0;
  HybridTypeModel: number = 0;
  DieselTypeModel: number = 0;
  totalPayments: number = 0;
  completePayments: number = 0;
  cashPayments: number = 0;
  totalUsers: number = 0;
  adminUsers: number = 0;
  normalUsers: number = 0;
  errorMessage: string = '';
  
  rentals!: Rental[];
  payments!: Payment[];
  users!: User[];
  brands!: Brand[];
  models!: Model[];
  cars!: CarDetails[];

  constructor(
    private rentalService: RentalService,
    private userService: UserService,
    private paymentService: PaymentService,
    private carService: CarService,
    private brandService: BrandService,
    private modelService: ModelService,
  ) { }

  ngOnInit(): void {
    this.getReports();
  }

  getReports(): void {
    this.rentalService.getrentals().subscribe(
      data => {        
        this.rentals = data;
        this.calculateRentalsStats(); // Call method to calculate total rentals and statuses
      },
      error => {
        this.errorMessage = 'Failed to fetch rental data';
      }
    );

    this.userService.getUsers().subscribe(
      data => {
        this.users = data;
        this.calculateUserStats();
      },
      error => {
        this.errorMessage = 'Failed to fetch user activity data';
      }
    );

    this.paymentService.getPayments().subscribe(
      data => {
        this.payments = data;
        this.calculatePaymentStats();
      },
      error => {
        this.errorMessage = 'Failed to fetch payment data';
      }
    );

    this.carService.getCars().subscribe(
      data => {
        this.cars = data;
        this.calculateCarStats();
      },
      error => {
        this.errorMessage = 'Failed to fetch car activity data';
      }
    );

    this.brandService.getBrands().subscribe(
      data => {
        this.brands = data;
        this.calculateBrandStats();
      },
      error => {
        this.errorMessage = 'Failed to fetch brand data';
      }
    );

    this.modelService.getModels().subscribe(
      data => {
        this.models = data;
        this.calculateModelStats();
      },
      error => {
        this.errorMessage = 'Failed to fetch model data';
      }
    );
  }

  calculateRentalsStats(): void {
    this.totalRentals = this.rentals.length;
    this.totalCompleted = this.rentals.filter(rental => rental.rentalStatus === 'Returned').length;
    this.totalBooked = this.rentals.filter(rental => rental.rentalStatus === 'Booked').length;
    this.totalReturned = this.rentals.filter(rental => rental.rentalStatus === 'Returned').length;
    this.totalPending = this.rentals.filter(rental => rental.rentalStatus === 'Pending').length;
    this.totalDeclined = this.rentals.filter(rental => rental.rentalStatus === 'Declined').length;
    this.totalRented = this.rentals.filter(rental => rental.rentalStatus === 'Rented').length;
  }

  calculateCarStats(): void {
    this.totalCars = this.cars.length;
    this.availableCars = this.cars.filter(car => car.status === 'Available').length;
    this.rentedCars = this.cars.filter(car => car.status === 'Rented').length;
    this.reservedCars = this.cars.filter(car => car.status === 'Reserved').length;
  }

  calculateBrandStats(): void {
    this.totalBrands = this.brands.length;
  }

  calculateModelStats(): void {
    this.totalModels = this.models.length;
    this.GasolineTypeModel = this.models.filter(model => model.fuelType === 'Gasoline').length;
    this.ElectricTypeModel = this.models.filter(model => model.fuelType === 'Electric').length;
    this.HybridTypeModel = this.models.filter(model => model.fuelType === 'Hybrid').length;
    this.DieselTypeModel = this.models.filter(model => model.fuelType === 'Diesel').length;
  }

  calculatePaymentStats(): void {
    this.totalPayments = this.payments.length;
    this.completePayments = this.payments.filter(Payment => Payment.paymentStatus === 'Complete').length;
    this.cashPayments = this.payments.filter(Payment => Payment.paymentMethod === 'Cash').length;
  }

  calculateUserStats(): void {
    this.totalUsers = this.users.length;
    this.adminUsers = this.users.filter(user => user.userRole === 'admin').length;
    this.normalUsers = this.users.filter(User => User.userRole === 'customer').length;
  }
}
