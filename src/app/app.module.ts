import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterModule, RouterLink } from "@angular/router";
import { ToastrModule } from "ngx-toastr";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrandAddComponent } from "./component/brand-add/brand-add.component";
import { CarAddComponent } from "./component/car-add/car-add.component";
import { CarManagementComponent } from "./component/car-management/car-management.component";
import { AdminComponent } from "./layouts/admin/admin.component";
import { BlankComponent } from "./layouts/blank/blank.component";
import { UserComponent } from "./layouts/user/user.component";
import { LoginComponent } from "./component/login/login.component";
import { ManageBrandsComponent } from "./component/manage-brands/manage-brands.component";
import { ManageCarsComponent } from "./component/manage-cars/manage-cars.component";
import { ManageModelsComponent } from "./component/manage-models/manage-models.component";
import { ModelAddComponent } from "./component/model-add/model-add.component";
import { RegisterComponent } from "./component/register/register.component";
import { HomeComponent } from './layouts/home/home/home.component';
import { AddUserComponent } from './component/add-user/add-user.component';
import { ListUserComponent } from './component/list-user/list-user.component';
import { UserDetailsComponent } from './component/user-details/user-details.component';
import { EditUserComponent } from './component/edit-user/edit-user.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { ListCarsComponent } from './component/list-cars/list-cars.component';
import { CarDetailsComponent } from './component/car-details/car-details.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';


@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    UserComponent,
    LoginComponent,
    RegisterComponent,
    BlankComponent,
    CarManagementComponent,
    ManageBrandsComponent,
    ManageModelsComponent,
    ManageCarsComponent,
    BrandAddComponent,
    ModelAddComponent,
    CarAddComponent,
    HomeComponent,
    AddUserComponent,
    ListUserComponent,
    UserDetailsComponent,
    EditUserComponent,
    DashboardComponent,
    ListCarsComponent,
    CarDetailsComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
    ToastrModule,
    RouterModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    RouterLink,
    ReactiveFormsModule,
    CarouselModule.forRoot()
  ],
  providers: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
