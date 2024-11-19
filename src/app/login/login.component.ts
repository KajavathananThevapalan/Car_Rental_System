import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm :FormGroup;
  logInData : any;

  constructor(private fb : FormBuilder,private router : Router)
  {
    this.loginForm =this.fb.group({
      email:['',[Validators.required]],
      password:['',[Validators.required]],
    })
  }
  
  onLogIn(){
  //   this.logInData = this.loginForm.value; 
  //   this.authorizationservice.logInUser(this.logInData).subscribe(data => {
  //     localStorage.setItem("token",data);
  //     this.router.navigate(['/admin/tasks'])
  //   },error => {
  //     this.toastr.error("err")
  //   }
  // )    
  }
}
