import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './layouts/admin/admin.component';
import { UserComponent } from './layouts/user/user.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FormBuilder } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { BlankComponent } from './layouts/blank/blank.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { RouterLink, RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarManagementComponent } from './car-management/car-management.component';
import { ManageBrandsComponent } from './manage-brands/manage-brands.component';
import { ManageModelsComponent } from './manage-models/manage-models.component';
import { ManageCarsComponent } from './manage-cars/manage-cars.component';
import { BrandAddComponent } from './brand-add/brand-add.component';
import { ModelAddComponent } from './model-add/model-add.component';
import { CarAddComponent } from './car-add/car-add.component';


@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    UserComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    BlankComponent,
    CarManagementComponent,
    ManageBrandsComponent,
    ManageModelsComponent,
    ManageCarsComponent,
    BrandAddComponent,
    ModelAddComponent,
    CarAddComponent
  ],
  imports: [
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
    RouterLink
  ],
  providers: [
   
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
