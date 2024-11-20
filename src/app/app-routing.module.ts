import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './layouts/admin/admin.component';
import { UserComponent } from './layouts/user/user.component';
import { BlankComponent } from './layouts/blank/blank.component';

const routes: Routes = [
  {
    path:'admin',
    component:AdminComponent,
    children:[
      
    ]
  },
  // {
  //   path:'user',
  //   component:UserComponent,
  //   children:[
      
  //   ]
  // },
  {
    path:'',
    component:BlankComponent,
    children:[
      {
        path:'register',component:RegisterComponent
      },
      {
        path:'login',
        component:LoginComponent
      },
      {
        path : '',
        component : HomeComponent
      },
      // {
      //   path:'**',
      //   redirectTo: "login",
      //   pathMatch:"full"
      // }
]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

}
