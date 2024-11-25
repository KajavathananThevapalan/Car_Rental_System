import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './component/register/register.component';
import { LoginComponent } from './component/login/login.component';
import { AdminComponent } from './layouts/admin/admin.component';
import { CarManagementComponent } from './component/car-management/car-management.component';
import { ManageBrandsComponent } from './component/manage-brands/manage-brands.component';
import { ManageModelsComponent } from './component/manage-models/manage-models.component';
import { ManageCarsComponent } from './component/manage-cars/manage-cars.component';
import { BrandAddComponent } from './component/brand-add/brand-add.component';
import { HomeComponent } from './layouts/home/home/home.component';
import { BlankComponent } from './layouts/blank/blank.component';
import { ModelComponent } from './component/model-add/model-add.component';
import { AdminGuard } from './guard/admin.guard';

const routes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AdminGuard],
    children: [
      { path: 'carmanagement', component: CarManagementComponent },
      { path: 'manage-brands', component: ManageBrandsComponent },
      { path: 'manage-models', component: ManageModelsComponent },
      { path: 'manage-cars', component: ManageCarsComponent },
      { path: 'brand-Add', component: BrandAddComponent },
      { path: 'brand-edit/:brandId', component: BrandAddComponent },
      { path: 'models', component: ModelComponent },
    ]
  },
  // {
  //   path:'user',
  //   component:UserComponent,
  //   children:[

  //   ]
  // },
  {
    path: '',
    component: BlankComponent,
    children: [
      { path: 'register', component: RegisterComponent },
      { path: 'login', component: LoginComponent },
      { path: '', component: HomeComponent },
      // {
      //   path:'**',
      //   redirectTo: "login",
      //   pathMatch:"full"
      // }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
