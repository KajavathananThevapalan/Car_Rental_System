import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthorizationService } from '../../services/authorization.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm !:FormGroup;
  logInData : any;
  
  constructor(private fb : FormBuilder,private authService : AuthorizationService,private toastr : ToastrService,private router : Router)
  {
    this.loginForm =this.fb.group({
      email:['',[Validators.required]],
      password:['',[Validators.required]],
    })
  }
  
  onLogIn(){
    this.logInData = this.loginForm.value; 
    this.authService.logInUser(this.logInData).subscribe(data => {
      localStorage.setItem("token",data);
      this.router.navigate(['/admin'])
    },error => {
      this.toastr.error("err")
    }
  )    
  console.log("hi");
  
  }

}
