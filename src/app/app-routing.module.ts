import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './component/register/register.component';
import { LoginComponent } from './component/login/login.component';
import { HomeComponent } from './layouts/home/home/home.component';
import { ModelAddComponent } from './component/model-add/model-add.component';
import { AdminComponent } from './layouts/admin/admin.component';
import { ManageBrandsComponent } from './component/manage-brands/manage-brands.component';
import { ManageModelsComponent } from './component/manage-models/manage-models.component';
import { BrandAddComponent } from './component/brand-add/brand-add.component';
import { CarAddComponent } from './component/car-add/car-add.component';
import { AddUserComponent } from './component/add-user/add-user.component';
import { ListUserComponent } from './component/list-user/list-user.component';
import { ManageCarsComponent } from './component/manage-cars/manage-cars.component';
import { UserDetailsComponent } from './component/user-details/user-details.component';
import { EditUserComponent } from './component/edit-user/edit-user.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { CarDetailsComponent } from './component/car-details/car-details.component';
import { AuthGuard } from './auth.guard';
import { RentNowComponent } from './component/rent-now/rent-now.component';
import { ListRentalComponent } from './component/list-rental/list-rental.component';
import { ListReservationComponent } from './component/list-reservation/list-reservation.component';
import { ListPaymentsComponent } from './component/list-payments/list-payments.component';
import { UserProfileComponent } from './component/user-profile/user-profile.component';
import { SidebarComponent } from './component/sidebar/sidebar.component';
import { PaymentComponent } from './component/payment/payment.component';
import { EditProfileComponent } from './component/edit-profile/edit-profile.component';

const routes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'payment/:rentalId', component: PaymentComponent },
      { path: 'sidebar', component: SidebarComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'manage-brands', component: ManageBrandsComponent },
      { path: 'manage-models', component: ManageModelsComponent },
      { path: 'manage-cars', component: ManageCarsComponent },
      { path: 'brand-Add', component: BrandAddComponent },
      { path: 'brand-edit/:brandId', component: BrandAddComponent },
      { path: 'model-Add', component: ModelAddComponent },
      { path: 'model-edit/:modelId', component: ModelAddComponent },
      { path: 'car-Add', component: CarAddComponent },
      { path: 'car-edit/:carId', component: CarAddComponent },
      { path: 'add-user', component: AddUserComponent },
      { path: 'list-user', component: ListUserComponent },
      { path: 'user/:id', component: UserDetailsComponent },
      { path: 'user/edit/:id', component: EditUserComponent },
      { path: 'list-rentals', component: ListRentalComponent },
      // { path: 'list-reservations', component: ListReservationComponent },
      { path: 'list-payments', component: ListPaymentsComponent },
    ]
  },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: UserProfileComponent },
  { path: 'profile/edit/:id', component: EditProfileComponent },
  { path: '', component: HomeComponent },
  {
    path: 'car-details/:carId',
    component: CarDetailsComponent,
    children: [
      { path: 'rent-now', component: RentNowComponent },
    ]
  },
  { path: '**', redirectTo: "login", pathMatch: "full" }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
