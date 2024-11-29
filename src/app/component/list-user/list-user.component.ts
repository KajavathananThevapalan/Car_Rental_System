import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../services/user.service';
import { User } from '../../models/User';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrl: './list-user.component.css'
})
export class ListUserComponent {

  constructor(private userService: UserService, private toastr: ToastrService, private router: Router) {

  }
  searchInput = '';

  users: User[] = [];



  ngOnInit(): void {
    this.loadUsers();
  }

  onDelete(UserId: number) {
    if (confirm("Do you want to delete this User?")) {
      this.userService.deleteUser(UserId).subscribe((data: any) => {
        this.toastr.success("success");
        this.loadUsers();
      })
    }
  }

  onEdit(UserId: number) {
    this.router.navigate(['admin/User-edit/', UserId])
  }

  loadUsers() {
    this.userService.getUsers().subscribe((data: any) => {
      console.log(data);
      this.users = data;
    })
  }
}
