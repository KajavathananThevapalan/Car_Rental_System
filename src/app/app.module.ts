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
import { ModelComponent } from "./component/model-add/model-add.component";
import { RegisterComponent } from "./component/register/register.component";
import { HomeComponent } from './layouts/home/home/home.component';


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
    ModelComponent,
    CarAddComponent,
    HomeComponent
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
    ReactiveFormsModule
  ],
  providers: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
